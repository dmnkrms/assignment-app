module Api
  class OwnersController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    http_basic_authenticate_with name: "user", password:"1234", only: :destroy

    # POST /companies/:company_id/owners
    def create
      company = Company.find(params[:company_id])
      owner = company.owners.create(owner_params)
      render json: {status: 'SUCCESS', message: 'New company added', data:owner}, status: :ok
    end

    # DELETE /companies/:company_id/owners/:id
    def destroy
      company = Company.find(params[:company_id])
      owner = company.owners.find(params[:id])
      owner.destroy
    end

    private 
    # Only allow a trusted parameter "white list" through.
    def owner_params
      params.require(:owner).permit(:name)
    end
  end
end
