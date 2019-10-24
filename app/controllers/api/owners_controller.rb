module Api
  class OwnersController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    http_basic_authenticate_with name: "user", password:"1234", only: :destroy

    def create
      company = Company.find(params[:company_id])
      owner = company.owners.create(owner_params)
    end

    def destroy
      company = Company.find(params[:company_id])
      owner = company.owners.find(params[:id])
      owner.destroy
    end

    private 
    def owner_params
      params.require(:owner).permit(:name)
    end
  end
end
