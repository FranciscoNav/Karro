class Category < ApplicationRecord
    has_many :expenses
    has_many :users, through: :expenses
    has_many :cars, through: :expenses
end
