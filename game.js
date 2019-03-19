
$(init);
//////////////////////////////////////////////////////////////////////////
////INIT//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//These are the click triggers that are placed on the page to activate the
//functions that we want to use on the page


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


function init()
{
    //start game
    $(".pick").on("click",pickParty);
    
    $("#input").on("click",crawlDungeon)
    
    //global abilities
    $(".atk").on("click",attack);
    $(".pro").on("click",protectWar);
    $(".heal").on("click",heal);
    $(".taunt").on("click",taunt);
    $("#fireball").on("click",fireball);
    
    //warrior abilities
    $("#sunder").on("click",sunder);
    
    //mage abilities
    $("#frost").on("click",windFlurry);
    $("#focus").on("click",arcaneFocus);
    
    //priest abilities
    $("#healParty").on("click",healParty);
    $(".revive").on("click",revive);
    
    //rogue abilities
    $("#rogueAtk").on("click",rogueAtk);
    $("#win").on("click",bleed);
    $("#backStab").on("click",backStab);
    $("#rogueSunder").on("click",rogueSunder);
    
    //warlock abilities
    $("#warlockAtk").on("click",warlockAtk);
    $("#curse").on("click",curseOfAgony);
    $("#warlockShadowStrike").on("click",warlockShadowStrike);
    $("#warlockFireBall").on("click",warlockFB);
    
    
    
}

//////////////////////////////////////////////////////////////////////////
////HEROES////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//this is the class that all of the characters in the game are part of.
//the class defines the characters traits and vitals during combat
//the class contains methods to fetch each attribute

/////////////////////////////////////////////////////////////////////////
//getMana()///////returns the amount of mana the hero has
//////////////////heroes that have mana use it in order to cast/activate thier //////////////////abilities
/////////////////////////////////////////////////////////////////////////
//getIntellect()//returns the intellect stat of the hero
//////////////////Intellect is a stat that determines damaging spells from
//////////////////caster classes
/////////////////////////////////////////////////////////////////////////
//getFocus()//////returns the focus stat of the hero
//////////////////Focus is a stat that increase chance to critically hit the
//////////////////enemy and determines the amount of mana and hp heroes regain
//////////////////each turn
/////////////////////////////////////////////////////////////////////////
//getThreat()/////returns the threat value of each hero
//////////////////Threat us the amount of dislike the enemy has for the hero
//////////////////the more threat the more likely the enemy will target the hero
//////////////////////////////////////////////////////////////////////////
//gainHP()////////
//loseHP()////////
//gainMana()//////
//loseMana()//////
//setThreat()/////
//upKeepMana()////
//upKeepHP()//////
//isDead()////////
//protect()///////
//isProtected()///
//printHealth()///
//printMana()/////
//critSpell()/////

class Hero
{
    constructor(name,attack,hitPoints,defense,mana,intellect,focus,threat,prot,maxHP,maxMana)
    {
        this.name = name;
        this.attack = attack;
        this.hitPoints = hitPoints;
        this.defense = defense;
        this.mana = mana;
        this.intellect = intellect;
        this.focus = focus;
        this.threat = threat;
        this.prot = prot;
        this.maxHP = maxHP;
        this.maxMana = maxMana;
    }
    
    //////////////////////////////////////////////////////////////////////////
    //getName()///////returns the name of the class"warrior" etc...
    getName()
    {
        return this.name;
    }
    
    //////////////////////////////////////////////////////////////////////////
    //getAttack()/////returns the attack of the Character
    //////////////////the characters attack is the value of damage the melee
    //////////////////heroes use to deal damage to the enemies
    getAttack()
    {
        return this.attack;
    }
    
    //////////////////////////////////////////////////////////////////////////
    //getHP()/////////returns the hitPoints of the hero.
    //////////////////this is the amount of damage that the hero can sustain during //////////////////combat
    getHP()
    {
        return this.hitPoints;
    }
    
    /////////////////////////////////////////////////////////////////////////
    //getDefense()////returns the defense of the hero
    //////////////////the defense of the hero is a check to resist damage from 
    //////////////////enemies
    getDefense()
    {
        return this.defense;
    }
    
    /////////////////////////////////////////////////////////////////////////
    //getMana()///////returns the amount of mana the hero has
    //////////////////heroes that have mana use it in order to cast/activate thier //////////////////abilities
    getMana()
    {
        return this.mana;
    }
    
    getMaxMana()
    {
        return this.maxMana;
    }
    /////////////////////////////////////////////////////////////////////////
    //getIntellect()//returns the intellect stat of the hero
    //////////////////Intellect is a stat that determines damaging spells from
    //////////////////caster classes
    getIntellect()
    {
        return this.intellect;
    }
    
    /////////////////////////////////////////////////////////////////////////
    //getFocus()//////returns the focus stat of the hero
    //////////////////Focus is a stat that increase chance to critically hit the
    //////////////////enemy and determines the amount of mana and hp heroes regain
    //////////////////each turn
    getFocus()
    {
        return this.focus;
    }
    
    /////////////////////////////////////////////////////////////////////////
    //getThreat()/////returns the threat value of each hero
    //////////////////Threat us the amount of dislike the enemy has for the hero
    //////////////////the more threat the more likely the enemy will target the hero
    getThreat()
    {
        return this.threat;
    }

    gainHP(x)
    {
        this.hitPoints = this.hitPoints+x;
        
        if(this.hitPoints>this.maxHP)
            {
                this.hitPoints=this.maxHP;
            }
    }
    
    loseHP(x)
    {
        this.hitPoints = this.hitPoints-x;
    }
    
    gainMana(x)
    {
        this.mana = this.mana+x;
        
        if(this.mana>this.maxMana)
            {
                this.mana=this.maxMana;
            }
    }
    
    loseMana(x)
    {
        this.mana = this.mana-x;
    }
    
    setThreat(x)
    {
        this.threat = this.threat+x;
    }
    
    upKeepMana()
    {
        this.mana = this.mana+(this.intellect/10);
    }
    
    upKeepHP()
    {
        this.hitPoints = this.hitPoints+(this.hitPoints/10);
    }
    
    isDead()
    {
        if(this.getHP()<=0)
            {
                return true;
            }
        return false;
    }
    
    protect()
    {
        this.prot = true;
    }
    
    isProtected()
    {
        if(this.prot==true)
            {
                this.defense = this.defense+20;
                this.prot = false;
            }
        else
            {
                this.defense = 10;
            }
    }
    
    printHealth()
    {
        var selector = "#"+(this.name).toLowerCase()+"Health";
        $(selector).text(this.hitPoints);
    }
    
    printMana()
    {
        var selector = "#"+(this.name).toLowerCase()+"Health";
        $(selector).text(this.hitPoints);
    }
    
    critSpell()
    {
        if((Math.floor(Math.random() * 100)+1)<(this.intellect/2))
            {
                return true;
            }
        else
            {
                return false;
            }
    }
    
    loseDefense(x)
    {
        this.defense = this.defense-x;
    }
    
    
}

///////////////////////////////////////////////////////////////////////////////
/////////////IN GAME VARIABLES/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//constructors for all the possible classes and the drgaon

const dragon = new Hero('Dragon',50,1000,20,0,0,0,0,false,1000,0);
const warrior = new Hero('Warrior',50,100,50,0,0,20,0,false,100,0);
const priest = new Hero('Priest',20,100,10,100,30,40,0,false,100,100);
const mage = new Hero('Mage',20,100,10,100,40,20,0,false,100,100);
const paladin = new Hero('Paladin',30,100,40,100,0,20,0,false,100,100);
const tracker = new Hero('Tracker',20,100,10,0,30,20,0,false,100,0);
const assasin = new Hero('Shadow Assasin',20,100,10,100,40,20,0,false,0,100);
const rogue = new Hero('Rogue',30,100,40,0,0,20,0,false,100,100);
const shaman = new Hero('Shaman',20,100,10,100,30,20,0,false,100,100);
const druid = new Hero('Druid',20,100,10,100,40,20,0,false,100,100);
const warlock = new Hero('Warlock',20,100,10,100,40,20,0,false,100,100);

//charge boolean for the dragons charge ability
//defined as false to start the game
var charge = false;

//an array to hold the party and variables partyTurn and partyLength to navigate
//the array.
var party = [];
var partyTurn = 0;
var partyLength = 0;
var loc = "front door";
var points = 0;
var gameOver = false;
var ancientText = false;
var spellBook = 0;
var sword = false;

///////////////////////////////////////////////////////////////////////////////
////Picking Party Function/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function pickParty()
{
    var val = $(this).val();
    switch(val)
    {
            case"warrior":
            {
                party.push(warrior);
                break;
            }
            case"paladin":
            {
                party.push(paladin);
                break;
            }
            case"tracker":
            {
                party.push(tracker);
                break;
            }
            case"assasin":
            {
                party.push(assasin);
                break;
            }
            case"rogue":
            {
                party.push(rogue);
                break;
            }
            case"shaman":
            {
                party.push(shaman);
                break;
            }
            case"priest":
            {
                party.push(priest);
                break;
            }
            case"druid":
            {
                party.push(druid);
                break;
            }
            case"warlock":
            {
                party.push(warlock);
                break;
            }
            case"mage":
            {
                party.push(mage);
                break;
            }
    }
    
    var newMember = "p"+(partyLength+1);
    var newMember2 = "par"+(partyLength+1);
    var newMember3 = "pic"+(partyLength+1);
    
    var picture = party[partyLength].getName()+".png";
    
    $("#"+newMember).text(party[partyLength].getName());
    $("#"+newMember2).text(party[partyLength].getName());
    $("#"+newMember3).html("<img src='"+picture+"'>");
    
    if(partyLength==2)
        {
            startGame();
            printOpeningScreen();
        }
    partyLength++;
}

///////////////////////////////////////////////////////////////////////////////
////Start Game Function////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function startGame()
{
    $("#game").show();
    $("#partySetup").hide();
    for(var x=0; x<party.length;x++)
        {
            $("#hBar"+x).text(party[x].getHP());
            $("#mBar"+x).text(party[x].getMana());
            $("#m"+x).css("width",party[x].maxMana);
            $("#pro"+x).text("Protect "+party[x].getName());
            $("#heal"+x).text("Heal "+party[x].getName());
            $("#healp"+x).text("Heal "+party[x].getName());
            $("#heals"+x).text("Heal "+party[x].getName());
            $("#heald"+x).text("Heal "+party[x].getName());
        }
    $("#"+party[0].getName()).show();
    
    
    
}

///////////////////////////////////////////////////////////////////////////////
/////////////MULTI CLASSS ABILITIES////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function attack()
{
    var damage = party[partyTurn].getAttack()-dragon.getDefense();

    damage = damage +(Math.floor(Math.random() * 20)+1);
    if(isNaN(damage))
        {
            damage = 1;
        }
    dragon.loseHP(damage);
    party[partyTurn].setThreat(damage);
    
    $("#message").text("The "+party[partyTurn].getName()+" Attacks The Dragon Dealing "+damage+" Damage To The Dragon!");
    $("#combatLog").prepend("The "+party[partyTurn].getName()+" Attacks The Dragon Dealing "+damage+" Damage To The Dragon!");
    $("#combatLog").prepend("<br>");
    endTurn();
    
}

function taunt()
{
    party[partyTurn].setThreat(150);
    
    $("#message").text(party[partyTurn].getName()+" Taunts The Dragon To Attack Him!");
    $("#combatLog").prepend(party[partyTurn].getName()+" Taunts The Dragon To Attack Him!");
    $("#combatLog").prepend("<br>");
    endTurn();
}

function heal()
{
    if(noMana(20))
        {
            var target = $(this).val();
    
            var heal = party[partyTurn].getIntellect()+(Math.floor(Math.random() * 20)+1);
            party[target].gainHP(heal);
            party[partyTurn].loseMana(20);

            $("#message").text(party[partyTurn].getName()+" Heals The Warrior For "+heal+"!");
            party[partyTurn].setThreat(heal*1.25);
            $("#combatLog").prepend(party[partyTurn].getName()+" Heals The Warrior For "+heal+"!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

///////////////////////////////////////////////////////////////////////////////
/////////////MAGE CLASSS ABILITIES/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
////Fireball/////////////////////////////////////////////
/////////////////////////////////////////////////////////
//costs 40 mana
//damage is based on charcaters intellect and has a chance to crit.
//high damage = high threat
function fireball()
{
    if(noMana(40))
        {
            var damage = party[partyTurn].getIntellect()+(Math.floor(Math.random() * 20)+1);
    
            if(party[partyTurn].critSpell())
                {
                    party[partyTurn].setThreat(damage/2);
                    damage = damage*2;
                }

            dragon.loseHP(damage);
            party[partyTurn].setThreat(damage);
            party[partyTurn].loseMana(40);

            $("#message").text("Fireball Hits The Dragon For "+damage+" Damage!");
            $("#combatLog").prepend("Fireball Hits The Dragon For "+damage+" Damage!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

//////////////////////////////////////////////////////////
////Wind Flurry///////////////////////////////////////////
//////////////////////////////////////////////////////////
//cost 20 mana
//damage is based on arcaneWeapons damage expect it will deal the damage 5 times
function windFlurry()
{
    if(noMana(20))
        {
            var damage1 = (mage.getIntellect()/10)+(Math.floor(Math.random() * 5)+1);
            var damage2 = (mage.getIntellect()/10)+(Math.floor(Math.random() * 5)+1);
            var damage3 = (mage.getIntellect()/10)+(Math.floor(Math.random() * 5)+1);
            var damage4 = (mage.getIntellect()/10)+(Math.floor(Math.random() * 5)+1);
            var damage5 = (mage.getIntellect()/10)+(Math.floor(Math.random() * 5)+1);

            if(mage.critSpell())
                {
                    mage.setThreat(damage1/2);
                    damage1 = damage1*2;
                }
            if(mage.critSpell())
                {
                    mage.setThreat(damage2/2);
                    damage2 = damage2*2;
                }
            if(mage.critSpell())
                {
                    mage.setThreat(damage3/2);
                    damage3 = damage3*2;
                }
            if(mage.critSpell())
                {
                    mage.setThreat(damage4/2);
                    damage4 = damage4*2;
                }
            if(mage.critSpell())
                {
                    mage.setThreat(damage5/2);
                    damage5 = damage5*2;
                }
            var totalDamage = damage1+damage2+damage3+damage4+damage5;

            dragon.loseHP(totalDamage);
            mage.setThreat(totalDamage);
            mage.loseMana(20);

            $("#message").text("Wind Flurry Hits The Dragon For "+damage1+", "+damage2+", "+damage3+", "+damage4+", "+damage5+" Damage!");
            $("#combatLog").prepend("Wind Flurry Hits The Dragon For "+damage1+", "+damage2+", "+damage3+", "+damage4+", "+damage5+" Damage!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

//////////////////////////////////////////////////////////
////Arcane Focus//////////////////////////////////////////
//////////////////////////////////////////////////////////
//no mana Cost
//regains a target party member to full mana
function arcaneFocus()
{
    mage.gainMana(75);
    $("#message").text("The Mage Focuses His Mind to Regain Mana!");
    $("#combatLog").prepend("The Mage Focuses His Mind to Regain Mana!");
    $("#combatLog").prepend("<br>");
    endTurn();
}

///////////////////////////////////////////////////////////////////////////////
/////////////WARRIOR CLASSS ABILITIES//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
////Protect///////////////////////////////////////////////
//////////////////////////////////////////////////////////
//no mana Cost
//target gets protected for the next turn
function protectWar()
{
    var target = $(this).val();
    party[target].protect();
    party[target].setThreat(-100);
    
    $("#message").text(party[partyTurn].getName()+" Protects The "+party[target].getName()+" For The Next Turn!");
    $("#combatLog").prepend(party[partyTurn].getName()+" Protects The "+party[target].getName()+" For The Next Turn!");
    $("#combatLog").prepend("<br>");
    endTurn();
}

//////////////////////////////////////////////////////////
////Sunder Armor//////////////////////////////////////////
//////////////////////////////////////////////////////////
//no mana Cost
//lowers the dragons defense by 5% allowing more damage to be dealt
function sunder()
{
    var amount = dragon.getDefense()*.1;
    party[partyTurn].setThreat(50);
    dragon.loseDefense(amount);
    
    $("#message").text(party[partyTurn].getName()+ " Weakens the Dragons Armor!");
    $("#combatLog").prepend(party[partyTurn].getName()+ " Weakens the Dragons Armor!");
    $("#combatLog").prepend("<br>");
    endTurn();
}

///////////////////////////////////////////////////////////////////////////////
/////////////PRIEST CLASSS ABILITIES///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
////Heal Party////////////////////////////////////////////
//////////////////////////////////////////////////////////
//Cost 40 mana
//heals the entire party equal to the characters intellect+ a d20

function healParty()
{
    if(noMana(40))
        {
            var message = ""+party[partyTurn]+" Heals ";
    
            party[partyTurn].loseMana(40);

            for(var x=0; x<party.length;x++)
                {
                    var heal = party[partyTurn].getIntellect()+(Math.floor(Math.random() * 20)+1)
                    party[x].gainHP(heal);
                    message = message+party[x].getName()+" for "+heal+", ";
                    party[partyTurn].setThreat(heal/5);
                }
            $("#message").text(message);
            $("#combatLog").prepend(message);
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

//////////////////////////////////////////////////////////
////Revive////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//Cost 100 mana
//revives fallen ally
function revive()
{
    if(noMana(20))
        {
            var damage = party[partyTurn].getIntellect()+(Math.floor(Math.random() * 10)+1);
    
            if(party[partyTurn].critSpell())
                {
                    party[partyTurn].setThreat(damage/2);
                    damage = damage*2;
                }

            dragon.loseHP(damage);
            party[partyTurn].setThreat(damage);
            party[partyTurn].loseMana(20);

            $("#message").text("Holy Smite Hits The Dragon For "+damage+" Damage!");
            $("#combatLog").prepend("Holy Smite Hits The Dragon For "+damage+" Damage!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }

}

///////////////////////////////////////////////////////////////////////////////
/////////////PALADIN CLASSS ABILITIES//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/////////////TRACKER CLASSS ABILITIES//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/////////////SHADOW ASSASIN CLASSS ABILITIES///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/////////////ROGUE CLASSS ABILITIES////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var bleed = false;
var bleedTurns = 0;

//////////////////////////////////////////////////////////
////Rogue Attack//////////////////////////////////////////
//////////////////////////////////////////////////////////
//Generates 20 Mana
//basic attack but also generates mana for the rogue
function rogueAtk()
{
    if(bleed&&(bleedTurn<10))
        {
            dragon.loseHP(10);
            bleedTurn++;
        }
    party[partyTurn].gainMana(20);
    attack();
}

//////////////////////////////////////////////////////////
////Bleed/////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//Costs 40 mana
//causes dragon to lose 10 health per turn for 10 turns
function bleed()
{
    if(noMana(40))
        {
            if(bleed&&(bleedTurn<10))
                {
                    dragon.loseHP(10);
                    bleedTurn++;
                }
            else
                {
                    bleed = true;
                    bleedTurn = 0;
                }
            party[partyTurn].loseMana(40);

            $("#message").text("The Rogue causes the Dragon to bleed out!");
            $("#combatLog").prepend("The Rogue causes the Dragon to bleed out!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}
//////////////////////////////////////////////////////////
////Back Stab/////////////////////////////////////////////
//////////////////////////////////////////////////////////
//Costs 60 mana
//deals 100 base damage
function backStab()
{
    if(noMana(60))
        {
            if(bleed&&(bleedTurn<10))
                {
                    dragon.loseHP(10);
                    bleedTurn++;
                }

            dragon.loseHP(100);
            party[partyTurn].loseMana(60);

            $("#message").text("Rogue stabs the Dragon in the back dealing 100 damage!");
            $("#combatLog").prepend("Rogue stabs the Dragon in the back dealing 100 damage!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

//////////////////////////////////////////////////////////
////Sunder Armor//////////////////////////////////////////
//////////////////////////////////////////////////////////
//Generates 20 mana
//lowers the dragons defenses
function rogueSunder()
{
    if(bleed&&(bleedTurn<10))
        {
            dragon.loseHP(10);
            bleedTurn++;
        }
    party[partyTurn].gainMana(20);
    sunder();
}


///////////////////////////////////////////////////////////////////////////////
/////////////DRUID CLASSS ABILITIES////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/////////////SHAMAN CLASSS ABILITIES///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/////////////WARLOCK CLASSS ABILITIES//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var curse = false;
var curseTurns = 0;

//////////////////////////////////////////////////////////
////Warlock Attack////////////////////////////////////////
//////////////////////////////////////////////////////////
//costs no mana
//basic attack for the warlock
function warlockAtk()
{
    if(curse&&(curseTurn<10))
        {
            dragon.loseHP(10);
            curseTurn++;
        }
    attack();
}

//////////////////////////////////////////////////////////
////Curse of Agony////////////////////////////////////////
//////////////////////////////////////////////////////////
//Costs 10 mana
//curses the dragon casuing 10 damage per turn for 10 turns
function curseOfAgony()
{
    if(noMana(10))
        {
            if(curse&&(curseTurn<10))
                {
                    dragon.loseHP(10);
                    curseTurn++;
                }
            else
                {
                    curse = true;
                    curseTurn = 0;
                }
            party[partyTurn].loseMana(10);

            $("#message").text("The Warlock curses the Dragon!");
            $("#combatLog").prepend("The Warlock curses the Dragon!");
            $("#combatLog").prepend("<br>");
            endTurn();
        }
}

//////////////////////////////////////////////////////////
////Shadow Strike/////////////////////////////////////////
//////////////////////////////////////////////////////////
//Costs 40 health
//deals damage based on warlocks intellect
function warlockShadowStrike()
{
    if(curse&&(curseTurn<10))
        {
            dragon.loseHP(10);
            curseTurn++;
        }
    var damage = party[partyTurn].getIntellect()+(Math.floor(Math.random() * 20)+1);
    
    if(party[partyTurn].critSpell())
        {
            party[partyTurn].setThreat(damage/2);
            damage = damage*2;
        }
    
    dragon.loseHP(damage);
    party[partyTurn].setThreat(damage);
    party[partyTurn].loseHP(damage/2);
    
    $("#message").text("Shadow Strike Hits The Dragon For "+damage+" Damage!");
    $("#combatLog").prepend("Shadow Strike Hits The Dragon For "+damage+" Damage!");
    $("#combatLog").prepend("<br>");
    endTurn();
}

//////////////////////////////////////////////////////////
////Warlock Fireball//////////////////////////////////////
//////////////////////////////////////////////////////////
//costs 40 mana
//damage is based on mages intellect and has a chance to crit.
//high damage = high threat
function warlockFB()
{
    if(curse&&(curseTurn<10))
        {
            dragon.loseHP(10);
            curseTurn++;
        }
    fireball();
}

///////////////////////////////////////////////////////////////////////////////
////End Turn///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//hides the previous party memebers moves and unhides the current party memebers moves
//if the array that the party is being held in runs out of party members than the dragons turn happens
//and the partyTurn is set to 0 to start the party's turns over again.

function endTurn()
{
    setPartyBars();
    setDragonHealth();
    
    if(dragon.getHP()<=0)
        {
            winGame();
        }
    
    $("#"+party[partyTurn].getName()).hide(); 
    partyTurn++;
    
    if(!party[partyTurn])
    {
        partyTurn=0;
        dragonTurn();
    }
    else
    {
        $("#"+party[partyTurn].getName()).show();
        $("#memberTurn").text(party[partyTurn].getName()+"'s Turn!");
    }
    
}

///////////////////////////////////////////////////////////////////////////////
////Dragon's Turn Function/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function dragonTurn()
{
    if(charge)
        {
            var output = "The Dragon Swallows The Party In Flames";
            
            var damage = (Math.floor(Math.random() * (dragon.getAttack()/2))+1)+dragon.getAttack();
            
            for(var i=0;i<party.length;i++)
                {
                    var tempDamage = damage-party[i].getDefense()
                    party[i].loseHP(tempDamage);
                    party[i].printHealth();
                    output+=" Dealing "+tempDamage+" to The "+party[i].getName();

                }
            
            charge = false;
            
            upKeep();
            setPartyBars();
            
            
            $("#message").text(output);
            $("#combatLog").prepend("<span id='dragonText'>"+output+"</span>");
            $("#combatLog").prepend("<br>");
            deadParty();
            $("#"+party[partyTurn].getName()).show();
            $("#displayName").text(party[partyTurn].getName()+"'s Turn!");
            
        }
    else
        {
            var random = (Math.floor(Math.random() * 3)+1);
            if(random==1)
                {
                    charge = true;
                    
                    upKeep();
                    setPartyBars();
                    
                    
                    $("#message").text("The Dragon Starts to Charge Up An Attack For Next Turn");
                    $("#combatLog").prepend("<span id='dragonText'>The Dragon Starts to Charge Up An Attack For Next Turn</span>");
                    $("#combatLog").prepend("<br>");
                    deadParty();
                    $("#"+party[partyTurn].getName()).show();
                    $("#displayName").text(party[partyTurn].getName()+"'s Turn!");
                }
            else
                {
                    var highestThreat =0;
                    
                    for(x=0;x<party.length;x++)
                        {
                            if(party[x].getThreat()>party[highestThreat].getThreat())
                                {
                                    highestThreat = x;
                                }
                        }
                    
                    var damage = (Math.floor(Math.random()*10)+1)+dragon.getAttack();
                    party[highestThreat].loseHP(damage);
                    
                    upKeep();
                    setPartyBars();
                    
                    $("#message").text("The Dragon Attacks The "+party[highestThreat].getName()+" For "+damage+" Damage!");
                    $("#combatLog").prepend("<span id='dragonText'>The Dragon Attacks The "+party[highestThreat].getName()+" For "+damage+" Damage!</span>");
                    $("#combatLog").prepend("<br>");
                    deadParty();
                    $("#"+party[partyTurn].getName()).show();
                    $("#displayName").text(party[partyTurn].getName()+"'s Turn!");
                }
        }
}

function setDragonHealth()
{
    var dHealthLoss = Math.round(dragon.getHP()/10)+"%";
    
    $("#dhBar0").text(dHealthLoss);
    $("#dhBar0").css("width",dHealthLoss);
}

function setPartyBars()
{
    for(var x=0; x<party.length;x++)
        {
            $("#hBar"+x).text(party[x].getHP());
            $("#hBar"+x).css("width",party[x].getHP());
            $("#mBar"+x).text(party[x].getMana());
            $("#mBar"+x).css("width",party[x].getMana());
        }
}

function upKeep()
{
    for(var x=0; x<party.length;x++)
        {
            party[x].gainMana(party[x].getFocus()*.25);
            party[x].gainHP(party[x].getFocus()*.15);
        }
}

function deadParty()
{
    for(var x=0; x<party.length;x++)
        {
            if(party[x].getHP()<=0)
                {
                    var name = party[x].getName()
                    var removed = party.splice(x);
                    var num = x+1;
                    var id = "pic"+num;
                    $("#"+id).hide();
                    $("#p"+num).html(name+" has died!");
                }
        }
}

    
function winGame()
{
    $("#message").html("<div style='font-size: 20px'>You Win!<br>Refresh the page to play agian!</div>");
}

function gameOver()
{
    $("#combat").hide();
    $("#game").hide();
    $("#dragon").hide();
    $("#message").html("You Lost!");
    
}

//validation errors

//no mana
//a check to see if the character has enough mana to use the spell
function noMana(x)
{
    if(party[partyTurn].getMana()<x)
        {
            $("#message").text("No Enough Mana!!!");
            return false;
        }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////DUNGEON CRAWLING CODE/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function printOpeningScreen()
{
    describeLocation();
}

function crawlDungeon()
{
    var command = $("#command").val();
    
    switch(loc.toUpperCase())
    {
        case"FRONT DOOR":
        {
            atfrontdoor(command);
            break;
        }
            
        case"ATRIUM":
        {
            atAtrium(command);
            break;
        }
        case"TREASURE ROOM":
        {
            atTreasureRoom(command);
            break;
        }
        case"STACY":
        {
            atStacy(command);
            break;
        }
    }
}

function atStacy(c)
{
    switch(c.toUpperCase())
    {
        case"TALK":
        {
            $("#message").html("You attempt to barter with STACY but have nothing to give to her .<br>You learn her CROWN was purchased on sale at a discount market and that she enjoys to build award winning indie games. <br> You become bored and beging to daydream about dragons.");
            break;
        }
        case"LOOK STACY":
        {
            $("#message").html("That CROWN really makes the outfit.");
            break;
        }
        case"LOOK CROWN":
        {
            $("#message").html("Man, that is a really nice CROWN.");
            break;
        }
        case"GIVE SWORD":
        {
            if(sword)
            {
                $("#message").html("You realize you have something to barter with. <br>You give the SWORD to STACY and she happily agress to tell you what she knows of the dragons in the region. <br> With this new knowledge,<br> the castle crumbles around you<br>and STACY rips out of her meat suit and transforms into a massive dragon<br>Well, who saw this coming??? <br> Your score is:"+points);
                loc="front door";
                fightDragon();
                break;
            }
            else
            {
                $("#message").html("You have no SWORD to give. What were you thinking???");
            }
            break;
        }
        case"NOT STACY":
        {
            var message = "You find yourself at the FRONT DOOR.  You need to make another choice.";
            loc = "front door";
            
            if(ancientText)
            {
                message = message+"<br>You realize you see a SPELL BOOK.";
            }
            else
            {
                message = message+"<br>You see an ANCIENT TEXT. Behind another scroll is the SPELL BOOK.";
            }
            $("#message").html(message+"<br>Obvious exits are ATRIUM, TREASURE ROOM and STACY.");
            break;
        }
        case"GO TREASURE ROOM":
        {
            badLocation();
            break;
        }
        case"GO ATRIUM":
        {
            badLocation();
            break;
        }
        default:
        {
            frontdoorCommand(c);
        }
    }
}

function atfrontdoor(c)
{
    switch(c.toUpperCase())
    {
        case"LOOK SPELL BOOK":
        {
            if(ancientText == false)
            {
                $("#message").html("Pressed wood shavings, shaving parchments I'd recognize it anywhere.");
            }
            else
            {
                $("#message").html("You realize you see nothing and feel a shock on your hands.<br>How rude.");
            }
            break;
        }
        case"LOOK ANCIENT TEXT":
        {
            $("#message").html("Looks like an ancient warning lies between these pages. <br> Words are smudged, you can make out the word 'Beware' and another word that starts with an 'S'");
            break;
        }
        case"GET ANCIENT TEXT":
        {
            if(ancientText == false)
            {
                $("#message").html("You take the ANCIENT TEXT and read <br> BEWARE READER<br>DANGER AWAITS TO THE ONE WHO HUNTS--<br>the text is smudged, you lean in to read when<br>The scroll disappears from your hands with the strong magical zap that comes with ancient warnings.");
                points = points+2;
                ancientText = true;
            }
            else
            {
                $("#message").html("Your mind is fuzzy, didn't you already look at the ANCIENT TEXT?? The ANCIENT TEXTS is no more. Honestly.");
                points = points-1;
            }
            break;
        }
        case"GET SPELL BOOK":
        {
            if(spellBook<2)
            {
                $("#message").html("You cannot pull the SPELL BOOK down. <br> For some reason, its firmly magically attached to the wall.<br> You look for a way to pry it off the wall but there is nothing in the room to help.<br> You decide it's not worth your time.");
                points = points+1;
                spellBook+=1;
                break;
            }
            else
            {
                $("#message").html("Okay, okay. The rest of your team shifts uneasily. Its not the first time they've disagreed with your choice.<br>You pull out a magical explosive from your bag for occassions such as SPELL BOOKs stuck to wall<br>You shake it out on the SPELL BOOK.<br>The room starts to shake<br>Your group takes off, leaving you behind as the ceiling collapses.<br>Apparently they were done listening to your crazy plans.");
                gameOver = true;
                points-=1000;
                $("#message").html("Your score is: "+sword);
            }
            break;
        }
        case"GO ATRIUM":
        {
            loc = "ATRIUM";
            $("#message").html("You go ATRIUM through the corridor.<br> You arrive at the parapets and see a Trident.<br> Obvious exits are the TREASURE ROOM.");
            break;
        }
        case"GO TREASURE ROOM":
        {
            loc = "TREASURE ROOM";
            $("#message").html("You head to the TREASURE ROOM after leaping over a caved in floor.  <br>Your team mutters about giants and that one time in Budapest.<br> You shake your head and realize you see a giant SWORD.<br>Obvious exits are ATRIUM.");
            break;
        }
        case"GO STACY":
        {
            loc = "STACY";
            $("#message").html("You arrive to the room STACY has taken over.<br> She wears a sporty frock coat and a giant CROWN.<br> She paces about nervously, like your appearance ratters her in someway. <br>Obvious exits are NOT STACY.");
            break;
        }
        default:
        {
            frontdoorCommand(c);
        }    
    }
}

function atAtrium(c)
{
    switch(c.toUpperCase())
    {
        case"LOOK PARAPETS":
        {
            $("#message").html("Well, they're parapets. You still really don't know what that means<br> but you heard an old lady say it once and you like the way it sounded.");
            break;
        }
        case"LOOK TRIDENT":
        {
            $("#message").html("It looks okay. You've seen better.");
            break;
        }
        case"GET TRIDENT":
        {
            $("#message").html("You attempt to take the TRIDENT but like the SPELL BOOK, it's enchanted!<br>You continue to tug on it as a member of your group mentions how you probably <br>shouldn't play with things if you can't tell if it has a brain or not.<br>You sass back saying 'What harm ever came from playing with Trident?'<br>The Trident lowers from the wall and glows flaming yellow and stabs you in the gut.<br>With your last breath, you stare at the PARAPETS whispering the word. GAME OVER.<br>Your score is: "+sword);
            gameOver=true;
            break;
        }
        case"GO TREASURE ROOM":
        {
            location = "front door";
            var message = "You find yourself on the front step of a castle.<br>You probably shouldn't have entered, but where's the fun in that?";
            if(scroll)
            {
                message = message+"<br>In the Back, there's a SPELL BOOK.";
            }
            else
            {
                message  = message+"<br>Ye see an ANICENT TEXT. Behind ye scroll is a SPELL BOOK.";
            }
            $("#message").html(message+"<br>Obvious exits are ATRIUM, TREASURE ROOM and STACY.");
            break;
        }
        case"GO STACY":
        {
            badLocation();
            break;
        }
        case"GO ATRIUM":
        {
            badLocation();
            break;
        }
        default:
        {
            frontdoorCommand(c);
        }            
    }
}

function atTreasureRoom(c)
{        
    switch(c.toUpperCase())
    {
        case"LOOK SWORD":
        {
            if(sword==false)
            {
                $("#message").html("Quit looking! Just get it already<br>Pansy.");
            }
            else
            {
                $("#message").html("It's heavier than it looks.<br>You lift it with both hands.");
            }
            break;
        }
        case"GET SWORD":
        {
            if(sword==false)
            {
                $("#message").html("You get the SWORD and realize on the hilt it says<br> 'Dragon Slayer'<br>You feel a cold shiver down your spine.<br>You hand off your own sword to your best mate and carry the Dragon Slayer on your shoulder.");
                points+=2;
                sword = true;
            }
            else
            {
                $("#message").html("Sigh. You have the SWORD already. Go do something else.");
                points-=1;
            }
            break;
        }
        case"GO ATRIUM":
        {
            loc = "front door";
            $("#message").html("You find yourself in an ATRIUM.<br> What the hell is an ATRIUM anyways?");
            if(scroll)
            {
                $("#message").html("Back over there is a SPELL BOOK.");
            }
            else
            {
                $("#message").html("You see an ANCIENT TEXT. Behind the ANCIENT TEXT is a SPELL BOOK.");
            }
            $("#message").html("Obvious exits are ATRIUM, TREASURE ROOM and STACY.");
            break;
        }
        case"GO TREASURE ROOM":
        {
            badLocation();
            break;
        }
        case"GO STACY":
        {
            badLocation();
            break;
        }
        default:
        {
            frontdoorCommand(c);
        }
    }    
}

function badLocation()
{
    $("#message").html("You walk into a destroyed room<br>like something large and angry had been in the castle<br>You realize you have to go somewhere else....quickly.");
}

function describeLocation()
{
    switch(loc)
    {
        case"front door":
        {
            var message = "You find yourself at the FRONT DOOR of a castle.<br> One that had appeared on no maps.<br> Strange";
            if(scroll)
            {
                message = message+"<br>Over there is a SPELL BOOK.";
            }
            else
            {
                message = message+"<br>Ye see an ANCIENT TEXT. Behind the ANCIENT TEXT is a SPELL BOOK.";
            }
            $("#message").html(message+"<br>Obvious exits are ATRIUM, TREASURE ROOM and STACY.");
            break;
        }
        case"ATRIUM":
        {
            $("#message").html("You're now at some parapets, and you definitely see a TRIDENT.<br> Obvious exits are TREASURE ROOM.");
            break;
        }
        case"TREASURE ROOM":
        {
            var message;
            if(sword)
            {
                message = "You are in the TREASURE ROOM where something large and angry <br>destroyed the floor leaving a giant valley of destruction.";
            }
            else
            {
                message = "You stand close to the edge of the destruction.<br>Your group warns you of peril, <br>but nonetheless, you spy a SWORD.";
            }
            $("#message").html(message+"<br>Obvius exit are ATRIUM");
            break;
        }
        case"STACY":
        {
            $("#message").html("You arrive at STACY.<br>She wears a sporty frock coat and a giant CROWN. She paces about nervously muttering about something about the last people she had just seen.<br>Or did she say last people she had just 'EATEN'<br>Obvious exits are NOT STACY");
            break;
        }
    }
}

function frontdoorCommand(c)
{
    switch(c.toUpperCase())
    {
        case"LOOK":
        {
            describeLocation();
            break;
        }
        case"HELP":
        {
            describeLocation();
            break;
        }
        case"HELPETH":
        {
            describeLocation();
            break;
        }
        case"DIE":
        {
            points-=100;
            $("#message").html("That wasn't very smart.<br>Your score was: "+points);
            gameOver=true;
            break;
        }
        case"DANCE":
        {
            $("#message").html("This is TERRIBLE music.  You dance anyways.");
            break;
        }
        case"GET DAGGER":
        {
            $("#message").html("Yeah, okay.");
            points = points+25;
            break;
        }
        case"SMELL":
        {
            $("#message").html("Does is smell like something large and angry lives in here??");
            break;
        }
        case"SNIFF":
        {
            $("#message").html("You smell a dragon.<br> But it can't be a dragon.");
            break;
        }
        case"FIGHT STACY":
        {
            fightDragon();
            points+=9000;
            $("#message").html("The wall rips open and out errupts a giant crown wearing DRAGON.<br>that was not smart. <br>Also, is that STACY???<br>Your score was: "+points);
            break;
        }
        default:
        {
            $("#message").html("Something is wrong with what you typed.  Type something else-liek HELP.");
        }
    }  
}

function promptForCommand()
{
    $("#message").html("What would you do?");
}

function fightDragon()
{
    $("#dragon").show();
    $("#combat").show();
    $("#inputDiv").hide();
    $("#combatLogButton").show();
}