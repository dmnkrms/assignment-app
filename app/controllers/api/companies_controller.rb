module Api
  class CompaniesController <ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods
    http_basic_authenticate_with name: "user", password:"1234", except: [:index, :show]

    # GET /companies
    def index
      companies = Company.order('created_at ASC')
      render json: {status: 'SUCCESS', message: 'Loaded companies list', data:companies}, status: :ok
    end

    # GET /companies/:id
    def show
      company = Company.find(params[:id])
      render json: {status: 'SUCCESS', message: 'Loaded single company by id', data:company, owners:company.owners}, status: :ok
    end

    # POST /companies
    def create
      company = Company.new(company_params)
      if company.save
        render json: {status: 'SUCCESS', message: 'New company added', data:company}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Failed to add new company', data:company.errors}, status: :unprocessable_entity
      end
    end

    # DELETE /companies/:id
    def destroy
      company = Company.find(params[:id])
      company.destroy
      render json: {status: 'SUCCESS', message: 'Company deleted', data:company}, status: :ok
    end

    # PATCH/PUT /companies/:id
    def update
      company = Company.find(params[:id])
      if company.update_attributes(company_params)
        render json: {status: 'SUCCESS', message: 'Updated company', data:company}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Failed to update company', data:company.errors}, status: :unprocessable_entity
      end
    end

    private
    # Only allow a trusted parameter "white list" through.
    def company_params
        params.permit(:name, :address, :city, :country, :email, :phonenumber)
    end
  end
end