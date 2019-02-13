class Advertiser < ApplicationRecord
  has_many :campaigns
  has_many :reports
end
