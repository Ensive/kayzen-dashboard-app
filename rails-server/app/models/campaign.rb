class Campaign < ApplicationRecord
  belongs_to :advertiser
  has_many :reports
end
