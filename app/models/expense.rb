class Expense < ApplicationRecord
    belongs_to :car
    belongs_to :user
    belongs_to :category
end
