myApp.controller('CampaignServiceController', ['$http', 'UserService', 'CampaignService', function ($http, UserService, CampaignService) {
    console.log('CampaignServiceController created');
    var self = this;

    // CampaignService variables
    self.campaignList = [];

    self.characterList = {
        list: []
    }
    self.monsterList = {
        list: []
    }
    self.encounterList = {
        list: []
    }

    // UserService variables
    self.userService = UserService;
    self.userObject = UserService.userObject;

    // CampaignService variables
	self.campaignService = CampaignService;
	self.campaignList = CampaignService.campaignList;
    self.message = CampaignService.message;
    self.characterList = CampaignService.characterList;
    self.monsterList = CampaignService.monsterList;
    self.encounterList = CampaignService.encounterList;
    self.campaign_id = CampaignService.campaign_id;
    self.showAddCampaign = false;
    self.showAddCharacter = false;
    self.showAddMonster = false;
    self.showAddEncounter = false;

    // Campaign object 
    self.campaign = {
        campaign_id: '',
        campaign_name: '',
        campaign_notes: '',
        user_id: self.userObject.id
    };

    // Character object 
    self.character = {
        character_id: '',
        character_name: '',
        character_icon: '',
        campaign_id: ''
    };

    // Monster object 
    self.monster = {
        monster_id: '',
        monster_name: '',
        monster_icon: ''
    };

    // Encounter object 
    self.encounter = {
        encounter_id: '',
        encounter_name: '',
        campaign_id: ''
    };

    // CAMPAIGN: CampaignService to get the list of campaigns
    self.getCampaignList = function () {
        CampaignService.getCampaignList(self.campaign, self.userObject.id);
    }

    console.log(self.campaignList);
    

    // CAMPAIGN: Run the getCampaignList function
    console.log(self.userObject);
    self.getCampaignList(self.userObject.id);


    // CAMPAIGN: Get the campaignList variable
    self.campaignList = CampaignService.campaignList;

    // CAMPAIGN: CampaignSerivce to add a campaign
    self.addCampaign = function (campaign, user_id) {
        console.log(campaign);
        
        CampaignService.addCampaign(self.campaign, self.userObject.id);
    }

    // CHARACTER: CampaignService to get the list of characters
    self.getCharacterList = function (character_id) {
        CampaignService.getCharacterList(self.character.chracter_id, self.campaign.campaign_id);
    }

    // CHARACTER: Run the getCharacterList function
    self.getCharacterList(self.campaign_id);


    // CHARACTER: Get the characterList variable
    self.characterList = CampaignService.characterList;

    // CHARACTER: CampaignSerivce to add a character
    self.addCharacter = function (character, campaign_id) {
        CampaignService.addCharacter(self.character, self.campaign.campaign_id);
    }

    // MONSTER: CampaignService to get the list of monsters
    self.getMonsterList = function (monster_id) {
        CampaignService.getMonsterList(self.monster, self.encounter.encounter_id);
    }

    // MONSTER: Run the getMonsterList function
    self.getMonsterList(self.monster.monster_id);


    // MONSTER: Get the monsterList variable
    self.monsterList = CampaignService.monsterList;

    // MONSTER: CampaignSerivce to add a monster
    self.addMonster = function (monster) {
        CampaignService.addMonster(self.monster);
    }

    // ENCOUNTER: CampaignService to get the list of encounters
    self.getEncounterList = function (encounter_id) {
        CampaignService.getEncounterList(self.encounter.campaign_id);
    }

    // ENCOUNTER: Run the getEncounterList function
    self.getEncounterList(self.encounter.campaign_id);


    // ENCOUNTER: Get the encounterList variable
    self.encounterList = CampaignService.encounterList;

    // ENCOUNTER: CampaignSerivce to add a encounter
    self.addEncounter = function (encounter, encounter_id) {
        CampaignService.addEncounter(self.encounter, self.encounter.campaign_id);
    }
}])