<!--
/////////////////////////////////////////////////////////////
/// Escapausorus v1 (2020)
///	A quick and dirty framework to create small adventure game (certified vanilla JS)
/// Author: Stéphanie Mader (http://smader.interaction-project.net)
/// GitHub: https://github.com/RedNaK/escaposaurus
///	Licence: MIT
////////////////////////////////////////////////////////////
-->

	/*
		HERE IS THE CONFIGURATION OF THE GAME
	*/
		/*either online with VOD server and JSON load of data
		either local */
		var isLocal = true ;
 		var gameRoot = "./" ;
 		var gameDataRoot = gameRoot+"escaposaurus_examplegamedata/" ;
 		var videoRoot = gameDataRoot+"videos/" ;

 		/*caller app*/
		var contactVideoRoot = videoRoot+"contactVideo/" ;

		/*full path to intro / outro video*/
		var missionVideoPath = videoRoot+"introVideo/intro1.mp4" ;
		var introVideoPath = videoRoot+"/intro1.mp4" ;
		var missingVideoPath = videoRoot+"contactVideo/missing/final.mp4" ;
		var epilogueVideoPath = videoRoot+"/outro1.mp4" ;

		/*udisk JSON path*/
		var udiskRoot = gameDataRoot+"udisk/" ;

		/*for online use only*/
		/*var udiskJSONPath = gameRoot+"escaposaurus_gamedata/udisk.json" ;
		var udiskJSONPath = "/helper_scripts/accessJSON_udisk.php" ;*/

		var udiskData =
		{
		   "root":{
		      "folders":[

						 {
							 "foldername":"cornetto",
							 "files": ["hot-fuzz.mp4", "shaun-of-the-dead.mp4", "worlds-end.mp4", "51jt2iGmUkL_AC.jpg"]
						 },

						 {
							 "foldername":"dossier-affaire",
							 "files": ["rappel.jpg", "logs-radio.jpg"],
							 "folders": [
								 {"foldername": "docs-j-cuse",
								  "password": "simonpegg",
									"sequence": 1,
								 	"files": [
										"rapport-cuse.jpg",
										"08102017-0254451.mp4",
										"wesecuryou-annuaire.jpg"
									],
									"folders": [
										{
											"foldername": "appel-wesecuryou",
											"password": "+33666898522",
											"sequence": 2,
											"files": ["Video_Envoyee_par_WeSecurYou.mp4"]
										}
									]
							 	 }
							 ]
						 },

		         {
		            "foldername":"videosurveillance-wesecuryou",
		            "sequence":0,
		            "files":[
										"04122018-06-23.mp4",
										"04122018-06-43.mp4",
										"04122018-07-12.mp4",
										"04122018-08-20.mp4",
										"04122018-09-45.mp4",
										"04122018-10-37.mp4",
										"04122018-11-20.mp4",
										"04122018-12-31.mp4",
										"04122018-13-25.mp4",
										"04122018-14-54.mp4",
										"04122018-15-29.mp4",
										"04122018-16-02.mp4",
										"04122018-17-54.mp4",
										"04122018-18-09.mp4",
										"04122018-18-42.mp4",
										"04122018-19-12.mp4",
										"04122018-20-57.mp4",
										"04122018-21-56.mp4",
										"04122018-22-13.mp4",
										"04122018-23-03.mp4",
										"04122018-23-36.mp4",
										"04122018-00-09.mp4",
										"04122018-01-13.mp4",
										"04122018-02-46.mp4",
										"04122018-03-03.mp4",
										"04122018-04-43.mp4"
		            ]
		         }

		      ],

		      "files":[
		      ]
		   }
		};

		var gameTitle = "The Cuse Case" ;
		var gameDescriptionHome = "" ;
		var gameMissionCall = "Vous travaillez en tant qu'avocat dans un cabinet. Votre patronne vous convoque pour vous parler d'une affaire." ;
		var gameMissionAccept = "&raquo;&raquo; Accepter le job &laquo;&laquo;" ;

		var gameCredit = "Un jeu conçu et réalisé par : <br/>Pierre ACEITUNO<br/>Brice CORNUAU<br/>Dorian FILLATRE<br/>Clément ORLANDINI<br/>Maëlys SCHOEPFER" ;
		var gameThanks = "" ;

		var OSName = "WinSucks 10.1 2020 Edition Premium Gold" ;
		var explorerName = "Disque E: - Clé USB de Paul" ;
		var callerAppName = "VoIP - Appeller un contact" ;

		/*titles of video windows*/
		var titleData = {} ;
		titleData.introTitle = "INTRODUCTION" ;
		titleData.epilogueTitle = "EPILOGUE" ;
		titleData.callTitle = "APPEL EN COURS..." ;

		/*change of caller app prompt for each sequence*/
		var promptDefault = "Rien à demander, ne pas les déranger." ;
		var prompt = [] ;
		prompt[0] = "Appeller Paul Icier pour lui parler de l'affaire" ;
		prompt[1] = "" ;
		prompt[2] = "" ;
		prompt[3] = "Contactez le centre WeSecurYou de Charente" ;
		prompt[4] = "" ;

		/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
		var sequenceWin = 4 ;

		/*before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array*/
		/*if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence*/
		/*if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence*/
		var seqMainHint = [] ;
		seqMainHint[0] = "worlds-end.mp4" ;
		seqMainHint[1] = "noHint" ; /*if you put anything that is not an existing filename of the udisk, the player will never be able to call any contacts or get helps during this sequence*/
		seqMainHint[2] = "aucun" ;
		seqMainHint[3] = "noHint" ;

		/*contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named seq%number of the current sequence%, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
		*/
		var normalContacts = [] ;
		normalContacts[0] = {"vid" : "Paul", "vod_folder" : "", "username" : "Paul Icier", "canal" : "video", "avatar" : "contact.png"} ;
		normalContacts[1] = {"vid" : "WeSecurYou", "vod_folder" : "", "username" : "WeSecurYou (vidéosurveillance)", "canal" : "video", "avatar" : "contact.png"} ;

		/*second part of the list, contact that can help the player*/
		var helperContacts = [] ;

		/*ce qui apparait quand on trouve le dernier élément du disque dur*/
		finalStepAdded = "La vidéo a été transmise." ;

		/*the last call, it can be the person we find in the end or anyone else we call to end the quest, allows the game to know it is the final contact that is called and to proceed with the ending*/
		var missingContact = {"vid" : "missing", "vod_folder" : "","username" : "Paul Icier",  "canal" : "video", "avatar" : "contact.png"} ;

		/*Lou only send text message, they are stored here*/
		var tips = {} ;

		var hints = [
			{hint: "Trouvez la bonne vidéo de vidéosurveillance. Peut-être qu'un document peut vous donner un indice sur l'heure de l'altercation ?", solution: "Regardez la vidéo 04122018-18-42.mp4"},
			{hint: "", solution: ""},
			{hint: "", solution: ""},
			{hint: "", solution: ""}
		]

		/*text for the instruction / solution windows*/
		var instructionText = {} ;
		instructionText.winState = "Apellez Paul pour lui faire part de votre découverte." ;
		instructionText.lackMainHint = "" ;
		instructionText.password = "Vous devez trouver et entrer le mot de passe d'un des dossiers de la boite de droite. Vous pouvez trouver le mot de passe en appelant les contacts de la boite de gauche.<br/>Pour entrer un mot de passe, cliquez sur le nom d'un dossier et une fenêtre s'affichera pour que vous puissiez donner le mot de passe." ;

		/*please note the %s into the text that allow to automatically replace them with the right content according to which sequence the player is in*/
		var solutionText = {} ;
		solutionText.winState = "Trouvez le morceau de vidéosurveillance manquant." ;
		solutionText.lackMainHint = "Vous devez ouvrir le fichier <b>%s</b><br/>" ;
		solutionText.password = "Vous devez déverouiller le dossier <b>%s1</b><br/>avec le mot de passe : <b>%s2</b><br/>" ;
