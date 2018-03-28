myApp.service('CampaignService', ['$http', '$location', function ($http, $location) {
    console.log('CampaignService Loaded');
    var self = this;

    // Storage for campaign list
    self.campaignList = {
        list: []
    }

    // Storage for character list
    self.characterList = {
        list: []
    }

    // Storage for encounter list
    self.monsterList = {
        list: []
    }

    // Storage for encounter list
    self.encounterList = {
        list: []
    }

    self.showAddCampaign = false;
    self.showAddCharacter = false;
    self.showAddMonster = false;
    self.showAddEncounter = false;

    // GET Campaign list
    self.getCampaigns = function (id) {
        $http.get(`/api/campaign/users/${id}`)
            .then(function (response) {
                self.campaignList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Campaign
    self.addCampaign = function (campaign, user_id) {
        if (campaign.campaign_name === '' || campaign.campaign_notes === '') {
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

    // GET Character list
    self.getCharacterList = function (campaign_id) {
        $http.get('/api/character')
            .then(function (response) {
                self.characterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Character
    self.addCharacter = function (character, campaign_id) {
        if (character.campaign_name === '' || character.character_icon === '') {
            self.message = "Enter a character name and a description!"
        } else {
            $http.post('/api/character', character)
                .then(function (response) {
                    self.showAddCharacter = false;
                    self.getCharacterList(campaign_id);
                    swal('The campaign was added!')
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

    // GET Monster list
    self.getMonsterList = function (id) {
        $http.get('/api/monster')
            .then(function (response) {
                self.monsterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Monster Character
    self.addMonster = function (monster, encounter_id) {
        if (monster.monster_name === '' || monster.monster_icon === '') {
            self.message = "Enter a character name and a description!"
        } else {
            $http.post('/api/monster', monster)
                .then(function (response) {
                    self.showAddMonster = false;
                    self.getMonsterList(encounter_id);
                    swal('The campaign was added!')
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

    // GET Encounter list
    self.getEncounterList = function (encounter, campaign_id) {
        $http.get(`/api/encounter`)
            .then(function (response) {
                self.encounterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Encounter
    self.addEncounter = function (encounter, campaign_id) {
        if (encounter.encounter_name === '' || encounter.campaign_id === '') {
            self.message = "Enter a encounter name and select a Campaign!"
        } else {
            $http.post('/api/encounter', encounter)
                .then(function (response) {
                    self.showAddCampaign = false;
                    self.getEncounterList(campaign_id);
                    swal('The campaign was added!')
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }
}])