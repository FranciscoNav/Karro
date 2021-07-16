class Car < ApplicationRecord
    has_many :expenses
    has_many :users, through: :expenses
    has_many :category, through: :expenses
end
