class Car < ApplicationRecord
    validates :year, presence: :true
    validates :make, presence: :true
    validates :model, presence: :true

    has_many :expenses
    has_many :users, through: :expenses
end
