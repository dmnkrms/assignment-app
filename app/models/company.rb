class Company < ApplicationRecord
  has_many :owners
  validates :name, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :country, presence: true
end
