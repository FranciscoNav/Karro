class Expense < ApplicationRecord
    validates :name, presence: :true
    validates :cost, presence: :true
    validates :date, presence: :true
    
    belongs_to :car
    belongs_to :user
    belongs_to :category
end
