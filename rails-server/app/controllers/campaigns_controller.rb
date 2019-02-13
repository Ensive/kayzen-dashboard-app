class CampaignsController < ApplicationController

  # def index
  #   @campaigns = Campaign.all
  #   json_response(@campaigns)
  # end

  # def show
  # end

  def show_summary
    @campaign_summary = Campaign
      .select([
        'id',
        'name',
        'cost_model',
        'CAST(SUM(reports.impressions) AS BIGINT) AS impressions',
        'CAST(SUM(reports.clicks) AS BIGINT) AS clicks',
        'CAST(SUM(reports.installs) AS BIGINT) AS installs',
        'CAST(SUM(reports.cost_micros) AS BIGINT) / 1000000 AS income'
      ])
      .where('reports.campaign_id': params[:id])
      .joins(:reports)
      .group(['campaigns.id', 'campaigns.name', 'campaigns.cost_model'])
      .order('CAST(SUM(reports.cost_micros) AS BIGINT) DESC')
      .first()

    # TODO: convert snake case into camelCase (auto)
    json_response(@campaign_summary)
  end

  def all_summary
    # @summary = summary
    json_response(all_campaigns_summary)
  end

  def top_5
    json_response(all_campaigns_summary.limit(5))
  end

  private

  def all_campaigns_summary
    Advertiser
      .select([
        'campaigns.id AS id',
        'advertisers.name AS "advertiser_name"',
        'campaigns.name AS "campaign_name"',
        'cost_model',
        'CAST(SUM(reports.impressions) AS BIGINT) AS impressions',
        'CAST(SUM(reports.clicks) AS BIGINT) AS clicks',
        'CAST(SUM(reports.installs) AS BIGINT) AS installs',
        'CAST(SUM(reports.cost_micros) AS BIGINT) / 1000000 AS income'
      ])
      .joins(:reports)
      .joins('INNER JOIN campaigns ON reports.campaign_id = campaigns.id')
      .group(['advertisers.id', 'campaigns.id', 'campaigns.cost_model'])
      .order('CAST(SUM(reports.cost_micros) AS BIGINT) DESC')
  end
end
