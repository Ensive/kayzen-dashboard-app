class ReportsController < ApplicationController
  def index
    @reports = Report.all
    @advertisers = Advertiser.all
    @campaigns = Campaign.all
    json_response({
      reports: @reports,
      advertisers: @advertisers,
      campaigns: @campaigns
    })
  end
end
