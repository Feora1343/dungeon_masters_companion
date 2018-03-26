myApp.service('CampaignService', ['$http', '$location', function ($http, $location) {
    console.log('CampaignService Loaded');
    var self = this;

    // Storage for character list
    self.characterList = {
        list: []
    }

    // Storage for campaign list
    self.campaignList = {
        list: []
    }

    // Storage for encounter list
    self.encounterList = {
        list: []
    }

    self.showAddCampaign = false;

    // Get Character list
    self.getCharacterList = function () {
        $http.get('/api/campaign/character')
            .then(function (response) {
                self.characterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // get Campaign list
    self.getCampaignList = function (id) {
        $http.get(`/api/campaign/user/${id}`)
            .then(function (response) {
                self.campaignList.list = response.data;
                self.campaignCount = self.campaignList.list;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // Add Campaign POST
    self.addCampaign = function (campaign, user_id) {
        if (campaign.campaign_name === '' || campaign.notes === '') {
            self.message = "Enter a campaign name and a description!"
        } else {
            $http.post('/api/campaign', campaign)
                .then(function (response) {
                    self.showAddCampaign = false;
                    self.getCampaignList(user_id);
                    swal('The campaign was added!')
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

    // Campaign DELETE request
    self.deleteCampaign = function (campaign, user_id) {
        if (!id) {
            swal("No campaign selected, Select a campaign to delete.")
        } else {
            swal({
                    text: "Are you sure you want to delete this campaign?",
                    icon: "warning",
                    buttons: ["Nope", "Yes, delete this campaign."],
                    closeOnClickOutisde: false
                })
                .then((willDelete) => {
                    if (willDelete) {
                        const campaign_id = id;
                        $http.delete(`/api/campaign/${campaign_id}`)
                            .then(function (response) {
                                swal("The campaign has been deleted.");
                                self.getCampaignList(user_id);
                            })
                            .catch(function (error) {
                                self.message = "Something went terribly wrong!"
                            })
                    } else {
                        swal("The campaign will not be deleted.")
                    }
                })
        }
    }
}])