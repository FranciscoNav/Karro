class User < ApplicationRecord
    validates :username, presence: :true
    validates :username, uniqueness: { case_sensitive: true }
    
    has_secure_password
    
    has_many :expenses
    has_many :car, through: :expenses
    has_many :category, through: :expenses
end
