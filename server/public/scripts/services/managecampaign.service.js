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
        $http.get(`/campaign/monster/${id}`)
            .then(function (response) {
                self.monsterList.list = response.data;
                console.log(self.monsterList.list);

            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Monster Character
    self.addMonster = function (monster, campaign_id) {
        console.log(monster, campaign_id);
        let new_monster = {
            monster_name: monster.monster_name,
            monster_icon: monster.monster_icon,
            campaign_id: campaign_id
        }
        console.log(new_monster);

        if (monster.monster_name === '' || monster.monster_icon === '') {
            self.message = "Enter a monster name and select monster icon!"
        } else {
            $http.post('/campaign/monster', new_monster)
                .then(function (response) {
                    self.showAddMonster = false;
                    self.getMonsterList(campaign_id);
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
    self.getEncounterList = function (id) {
        $http.get(`/campaign/encounter/${id}`)
            .then(function (response) {
                self.encounterList.list = response.data;
            })
            .catch(function (error) {
                self.message = "Something has gone terribly wrong!"
            })
    }

    // POST Create Encounter
    self.addEncounter = function (encounter, campaign_id, character, monster) {
        console.log('abcd', encounter, campaign_id, character, monster);
        let new_encounter = {
            encounter_name: encounter,
            campaign_id: campaign_id,
            character: character,
            monster: monster
        }
        // TODO: INSERT CHARACTER AND MONSTER NOT EMPTY LIST
        if (encounter.encounter_name === '' || encounter.campaign_id === '') {
            self.message = "Enter a encounter name, select a Campaign, select some characters as well as monsters!"
        } else {

            $http.post('/campaign/encounter', new_encounter)
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

    // DELETE Delete Character
    self.deleteCharacter = function (character, character_id) {
        swal({
                text: "Are you sure you want to delete this character?",
                icon: "../images/sweetalerts/deletecharacterwarning.png",
                buttons: ["Not Yet", "Yes, Delete."],
                dangerMode: true,
                closeOnClickOutside: false
            })
            .then(function (willDelete) {
                if (willDelete) {
                    $http.delete(`/campaign/character/${character_id}`)
                        .then(function (response) {
                            swal({
                                title: "The character has been removed!",
                                icon: "../images/sweetalerts/deletecharacter.png"
                            }).then(function () {
                                location.reload();
                            })
                        })
                        .catch(function (error) {
                            console.log('error, response:', error);
                            self.message = "Something has gone terribly wrong!"
                        });
                } else {
                    swal('The character will not be removed.');
                }
            });

    };

    // DELETE Delete Monster
    self.deleteMonster = function (monster, monster_id) {
        swal({
                text: "Are you sure you want to delete this monster?",
                icon: "../images/sweetalerts/deletemonsterwarning.png",
                buttons: ["Not Yet", "Yes, Delete."],
                dangerMode: true,
                closeOnClickOutside: false
            })
            .then(function (willDelete) {
                if (willDelete) {
                    $http.delete(`/campaign/monster/${monster_id}`)
                        .then(function (response) {
                            swal({
                                title: "The monster has been removed!",
                                icon: "../images/sweetalerts/deletemonster.png"
                            }).then(function () {
                                location.reload();
                            })
                        })
                        .catch(function (error) {
                            console.log('error, response:', error);
                            self.message = "Something has gone terribly wrong!"
                        });
                } else {
                    swal('The monster will not be removed.');
                }
            });

    };

    // DELETE Delete Encounter
    self.deleteEncounter = function (encounter, campaign_id) {
        swal({
                text: "Are you sure you want to delete this encounter?",
                icon: "warning",
                buttons: ["Not Yet", "Yes, Delete."],
                dangerMode: true,
                closeOnClickOutside: false
            })
            .then((willDelete) => {
                if (willDelete) {
                    const encounter_id = id;
                    $http.delete(`/encounter/${id}`)
                        .then(function (response) {
                            swal({
                                title: "The encounterhas been removed!",
                                icon: "../images/sweetalerts/deleteencounter.png"
                            });
                            self.getEncounterList(encounter_id);
                        })
                        .catch(function (error) {
                            console.log('error, response:', response);
                            self.message = "Something has gone terribly wrong!"
                        });
                } else {
                    swal('The encounter will not be removed.');
                }
            });
    }
}])