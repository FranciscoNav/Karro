class ExpensesController < ApplicationController
    # before_action :authorized

    def index
        user = User.find_by(id: session[:user_id])
        if params[:car_id]
            car = user.cars.find(params[:car_id])
            expenses = car.expenses.where(user_id: user.id)
        else
            expenses = user.expenses
        end
        render json: expenses
    end

    def create
        user = User.find_by(id: session[:user_id])
        if expense_params[:car_attributes]
            expense = user.expenses.create(expense_params)
            if expense.valid?
                render json: expense, include: :car, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        else
            expense = user.expenses.create(name: expense_params[:name], cost: expense_params[:cost], date: expense_params[:date], car_id: expense_params[:car_id])
            render json: expense, include: :car, status: :created
        end
    end
 
    def show
        user = User.find_by(id: session[:user_id])
        expense = user.expenses.find_by(id: params[:id])
        if expense
            render json: expense
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        expense = user.expenses.find_by(id: params[:id])
        # Edit form not working because it's trying to edit the car too?
        if expense
            expense.update(expense_params)
            render json: expense
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        expense = user.expenses.find_by(id: params[:id])
        if expense
            expense.destroy
            head :no_content   
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    private 

    def expense_params
        params.require(:expense).permit(:name, :cost, :date, :car_id, car_attributes: [:year, :make, :model])
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end

