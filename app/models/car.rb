class Car < ApplicationRecord
    has_many :expenses
    has_many :users, through: :expenses

    accepts_nested_attributes_for :expenses
end
