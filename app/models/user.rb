class User < ApplicationRecord
    validates :name, presence: :true
    validates :name, uniqueness: { case_sensitive: true }
    
    has_secure_password
    
    has_many :expenses
    has_many :cars, through: :expenses
end
