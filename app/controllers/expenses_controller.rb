class ExpensesController < ApplicationController
    before_action :authorized

    def index
        user = User.find_by(id: session[:user_id])
        car = user.cars.find(params[:car_id])
        expenses = car.expenses.where(user_id: user.id)
        render json: expenses, include: :car
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
        elsif expense_params[:car_id]
            expense = user.expenses.create(name: expense_params[:name], cost: expense_params[:cost], date: expense_params[:date], car_id: expense_params[:car_id])
            if expense.valid?
                render json: expense, include: :car, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        else
            car = user.cars.find_by(id: params[:car_id])
            new_expense = car.expenses.create(expense_params)
            if new_expense[:cost] == nil ||  new_expense[:name] == "" || new_expense[:date] == nil
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            else
                user.expenses << new_expense
                render json: new_expense, include: :car, status: :created
            end 
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        expense = user.expenses.find_by(id: params[:id])
        if expense
            expense.update(expense_params)
            render json: expense, include: :car
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