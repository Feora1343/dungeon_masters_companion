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

    self.character = {
        list: []
    }
    self.showAddCampaign = false;
    self.showAddCharacter = false;
    self.showAddMonster = false;
    self.showAddEncounter = false;

    // GET Campaign list
    self.getCampaignList = function (dm_id) {
        console.log(dm_id);
        const id = dm_id.user_id;
        console.log(id);

        $http.get(`/campaign/users/${id}`)
            .then(function (response) {

                self.campaignList.list = response.data;
                console.log(self.campaignList);

            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Campaign
    self.addCampaign = function (campaign, user_id) {
        console.log(campaign, user_id);

        if (campaign.campaign_name === '' || campaign.campaign_notes === '') {
            self.message = "Enter a campaign name and a description!"
        } else {
            $http.post('/campaign', campaign)
                .then(function (response) {
                    self.showAddCampaign = false;
                    self.getCampaignList(user_id);
                    swal({
                            title: "The Campaign Was Added!",
                            icon: "../images/sweetalerts/addcampaign.png"
                        }).then(function () {
                            location.reload();
                        })
                        .catch(function (error) {
                            self.message = "Something has gone terribly wrong!"
                        })
                })
        }
    }

    // GET Character list
    self.getCharacterList = function (id) {
        console.log(id);
        
        
        $http.get(`/campaign/character/${id}`)
            .then(function (response) {
                self.characterList.list = response.data;
                console.log(self.characterList.list);
                self.character = self.characterList.list;
                
                
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Character
    self.addCharacter = function (character, campaign_id) {
        console.log(character, campaign_id);
        let new_character = {
            character_name: character.character_name,
            character_icon: character.character_icon,
            campaign_id: campaign_id
        }
        console.log(new_character);


        if (character.character_name === '' || character.character_icon === '') {
            self.message = "Enter a character name and a description!"
        } else {
            $http.post('/campaign/character', new_character)
                .then(function (response) {
                    self.showAddCharacter = false;
                    
                    self.getCharacterList(campaign_id);
                    swal({
                        title: "The Character Was Added!",
                        icon: "../images/sweetalerts/addcharacter.png"
                    }).then(function () {
                        location.reload();
                    })
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

    // GET Monster list
    self.getMonsterList = function (id) {
        $http.get('/campaign/monster')
            .then(function (response) {
                self.monsterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Monster Character
    self.addMonster = function (monster) {
        console.log(monster);
        let new_monster = {
            monster_name: monster.monster_name,
            monster_icon: monster.monster_icon,
        }
        console.log(new_monster);

        if (monster.monster_name === '' || monster.monster_icon === '') {
            self.message = "Enter a monster name and select monster icon!"
        } else {
            $http.post('/campaign/monster', new_monster)
                .then(function (response) {
                    
                    self.showAddMonster = false;
                    self.getMonsterList();
                    swal({
                        title: "The Monster Was Added!",
                        icon: "../images/sweetalerts/addmonster.png"
                    }).then(function () {
                        location.reload();
                    })
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

    // GET Encounter list
    self.getEncounterList = function (encounter, campaign_id) {
        $http.get(`/campaign/encounter`)
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
            $http.post('/encounter', encounter)
                .then(function (response) {
                    self.showAddEncounter = false;
                    self.getEncounterList(campaign_id);
                    swal({
                        title: "The Encounter Was Added!",
                        icon: "../images/sweetalerts/addencounter.png"
                    }).then(function () {
                        location.reload();
                    })
                })
                .catch(function (error) {
                    self.message = "Something has gone terribly wrong!"
                })
        }
    }

}])