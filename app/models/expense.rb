class Expense < ApplicationRecord
    validates :name, presence: :true
    validates :cost, presence: :true
    validates :date, presence: :true

    belongs_to :car
    belongs_to :user

    accepts_nested_attributes_for :car, reject_if: :all_blank
end
