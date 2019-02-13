class Report < ApplicationRecord
  belongs_to :advertiser
  belongs_to :campaign
end
