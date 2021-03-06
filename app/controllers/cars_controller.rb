class CarsController < ApplicationController
    before_action :authorized

    def index
        user = User.find_by(id: session[:user_id])
        cars = user.cars.uniq
        render json: cars
    end

    def indexAll
        cars = Car.all
        render json: cars, include: :expenses
    end

    def create
        user = User.find_by(id: session[:user_id])
        car = user.cars.create(car_params)
        if car
            render json: car, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        car = user.cars.find_by(id: params[:id])
        if car
            exps = car.expenses
            exps.destroy_all 
            head :no_content   
        else
            render json: { error: "Not Authorized"}, status: :unauthorized
        end
    end

    private 

    def car_params
        params.permit(:year, :make, :model)
    end

    def authorized
        return render json: {error: "unauthorized" }, status: :unauthorized unless session.include? :user_id
    end
end
