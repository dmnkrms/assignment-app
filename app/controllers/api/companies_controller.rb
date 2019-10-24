module Api
  class CompaniesController <ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    http_basic_authenticate_with name: "user", password:"1234", except: [:index, :show]

    def index
      companies = Company.order('created_at DESC')
      render json: {status: 'SUCCESS', message: 'Loaded companies list', data:companies}, status: :ok
    end

    def show
      company = Company.find(params[:id])
      render json: {status: 'SUCCESS', message: 'Loaded single company by id', data:company}, status: :ok
    end

    def create
      company = Company.new(company_params)
      if company.save
        render json: {status: 'SUCCESS', message: 'New company added', data:company}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Failed to add new company', data:company.errors}, status: :unprocessable_entity
      end
    end

    def destroy
      company = Company.find(params[:id])
      company.destroy
      render json: {status: 'SUCCESS', message: 'Company deleted', data:company}, status: :ok
    end

    def update
      company = Company.find(params[:id])
      if company.update_attributes(company_params)
        render json: {status: 'SUCCESS', message: 'Updated company', data:company}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Failed to update company', data:company.errors}, status: :unprocessable_entity
      end
    end

    private
    #define permited request params for creating a new company and updating existing one
    def company_params
        params.permit(:name, :address, :city, :country, :email, :phonenumber)
    end
  end
end