class Car < ApplicationRecord
    has_many :expenses
    has_many :users, through: :expenses

    # def expenses_attributes=(attributes)
    #     byebug
    # end

    # accepts_nested_attributes_for :expenses
end
