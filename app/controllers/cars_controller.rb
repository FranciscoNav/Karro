class CarsController < ApplicationController
    # def index
    #     user = User.find_by(id: session[:user_id])
    #     expenses = user.expenses
    #     render json: expenses
    # end

    # def create
    #     user = User.find_by(id: session[:user_id])
    #     expense = user.expenses.create(expense_params)
    #     if expense.valid?
    #         render json: expense, status: :created
    #     else
    #         render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    #     end
    # end
 
    # def show
    #     user = User.find_by(id: session[:user_id])
    #     expense = user.expenses.find_by(id: params[:id])
    #     if expense
    #         render json: expense
    #     else
    #         render json: { error: "Not Authorized"}, status: :unauthorized
    #     end
    # end

    # def destroy
    #     user = User.find_by(id: session[:user_id])
    #     expense = user.expenses.find_by(id: params[:id])
    #     if expense
    #         expense.destroy
    #         head :no_content   
    #     else
    #         render json: { error: "Not Authorized"}, status: :unauthorized
    #     end
    # end

    # private 

    # def expense_params
    #     params.permit(:name, :cost, :date)
    # end

    # def authorized
    #     return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    # end
end
