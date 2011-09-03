const SUpE_META=<><![CDATA[
// ==UserScript==
// @name		 EqdBannerRotation
// @shortname	 EqDB
// @namespace	 http://danneh.net
// @description  Random Eqd Banners!
// @match	     http://www.equestriadaily.com/*
// @include	     http://www.equestriadaily.com/*
// @run-at		 document-end
// @released	 2011/9/3 14:55:00
// @frequency	 1 minute
// @releaseurl	 http://github.com/Danneh/EqdBannerRotation/raw/master/eqd.user.js
// @scripturl	 http://github.com/Danneh/EqdBannerRotation/raw/master/eqd.user.js
// ==/UserScript==
]]></>.toString();


/* Options
*/
var include_old         = true; /* old-style banners */
var include_old_special = true; /* old-style special banners */
var include_new         = true; /* new-style banners */
var include_new_special = true; /* new-style special banners */


/* Banners
*/

var banners = []

if(include_old) {
	/* pinkie don't give a */ banners.push("pinkie link");
	/* ed banner group */ banners.push("ed link");
}

if(include_old_special) {
	/* 4th of july */ banners.push("4th link");
}

if(include_new) {
	/* fluttershy */ banners.push("fluttershy link");
	/* trixie */ banners.push("trixie link");
}

if(include_new_special) {
	/* brony day */ banners.push("brony link");
	/* 30000000 views */ banners.push("30000000 link");
}


/* Replacement Code
*/

/* from http://www.admixweb.com/2010/08/24/javascript-tip-get-a-random-number-between-two-integers/ */
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var banner = document.getElementById("Header1_headerimg");
var banner_num = randomFromTo(0, banners.length-1);
banner.src = banners[banner_num];
banner.removeAttribute("width");
banner.removeAttribute("height");


/* Autoupdate Script --- from https://www.userscripts.org/scripts/show/29878
*/
SUpE_SelfUpdater();
//Self-updater function is copyright <GasBuddyPhilly@yahoo.com>,
// located at <http://userscripts.org/scripts/show/29878>,
// and licensed under <http://gnu.org/licenses/gpl-3.0.html>,
// incorporated herein by reference.
function SUpE_SelfUpdater()
{//localizable strings
 const CKNOW='Check Now For ';
 const UPDTE=' Update';
 const SETTT='Set ';
 const UPIVL=' Update Interval';
 const ITAPP='It appears this is the first time you\'ve used\n'+
  'the ';
 const ISDES=' script.\n'+
  'This script is designed to automatically\n'+
  'check for updates every ';
 const CHIVL='.\n'+
  'Would you like to change this interval?'
 const HWLNG='How long would you like the ';
 const WAITB='\n'+
  'script to wait between update checks?\n'+
  'Enter an interval such as "12 hours" or "1 week".';
 const DIDNT='I didn\'t understand that.\n\n';
 const UPIN4='The update interval for the ';
 const REMAI='\n'+
  'script remains set at ';
 const UMAYS='.  You may\n'+
  'select "';
 const FRMTH='" from the\n'+
  '"User Script Commands..." menu at any time\n'+
  'to change this.';
 const THRIS='There is an update available for the\n';
 const GRSCR=' Greasemonkey script.';
 const INSIT='\n'+
  'Would you like to install it?';
 const UWILB='You will be reminded about this update again\n'+
  'in ';
 const THRNO='There is no update available for the\n';
 const SELFU='The self-updater for the ';
 const WASUN='\n'+
  'script was unable to locate any valid update\n'+
  'information.  This could mean that this\n'+
  'computer has lost its Internet connection, or\n'+
  'that the original site for this script has gone\n'+
  'down, moved, or disappeared.\n\n'+
  'This script will check again in '
 //l10n not recommended
 const S_LU='SUpE_LastUpdateCheck';
 const S_UF='SUpE_UpdateFrequency';
 const INVDT='Invalid Date';

 var parms=parseParms(SUpE_META);
 if(!parms.shortname)
 {parms.shortname=parms.name;
 };
 GM_registerMenuCommand
 (SETTT+parms.shortname+UPIVL,
  function()
  {GM_setValue(S_UF,askUF(parms,GM_getValue(S_UF)));
  }
 );
 GM_registerMenuCommand
 (CKNOW+parms.shortname+UPDTE,
  function()
  {parms.m=true;
   doUpCk();
  }
 );
 var LU=new Date(GM_getValue(S_LU,''));
 if(LU.toString()==INVDT)
 {LU=new Date(0);
  GM_setValue(S_LU,LU.toString());
 };
 var UF=GM_getValue(S_UF,'');
 if(!toMillis(UF))
 {if(!confirm(ITAPP+parms.name+ISDES+parms.frequency+CHIVL))
  {UF=parms.frequency;
   GM_setValue(S_UF,UF);
   alert(UPIN4+parms.name+REMAI+UF+UMAYS+SETTT+parms.shortname+UPIVL+
    FRMTH);
  }else
  {UF=askUF(parms,parms.frequency);
   GM_setValue(S_UF,UF);
  };
 };
 if(Number(new Date(LU))+toMillis(UF)<=new Date())
 {doUpCk();
 };
 function doUpCk()
 {LU=new Date();
  GM_setValue(S_LU,LU.toString());
  doXHRs();
 };
 function doXHRs(xhr)
 {var lyn,dte;
  GM_log('pass '+parms.i);
  if(!xhr)
  {GM_log('no response to look at - moving on');
   nextXHR(parms);
  }else
  {GM_log('response received');
   if(!xhr.status)
   {GM_log('no status found in response - moving on');
    nextXHR(parms);
   }else
   {GM_log('status code of "'+xhr.status+'" received');
    if(xhr.status!=200)
    {GM_log('error status received - moving on');
     nextXHR(parms);
    }else
    {GM_log('successful status received');
     if(!xhr.responseText)
     {GM_log('no response text received - moving on');
      nextXHR(parms);
     }else
     {GM_log(xhr.responseText.length+
       ' characters of response text received');
      lyn=xhr.responseText.
       match(/\/\/ \@released\s+([^\r\n<]+)\s*[\r\n<]/);
      if(!lyn||!lyn[1])
      {GM_log('no release date in response text - moving on');
       nextXHR(parms);
      }else
      {dte=new Date(lyn[1]);
       if(dte.toString()==INVDT)
       {GM_log('release date uninterpretable - moving on');
        nextXHR(parms);
       }else
       {GM_log('release date of "'+dte.toString()+
         '" found in response');
        GM_log('comparing to installed release - "'+
         parms.released.toString()+'"');
        if(parms.released<dte)
        {GM_log('release found is newer - '+
         'getting new release from '+parms.scriptURLs[parms.i-1]);
         if(confirm(THRIS+parms.name+GRSCR+INSIT))
         {GM_openInTab(parms.scriptURLs[parms.i-1]);
         }else
         {alert(UWILB+UF+UMAYS+SETTT+parms.shortname+UPIVL+FRMTH);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        }else
        {GM_log('release found is not newer - ending update check');
         if(parms.m)
         {alert(THRNO+parms.name+GRSCR);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        };//end if(parms.released<dte)
       };//end if(dte.toString()==INVDT)
      };//end if(!lyn||!lyn[1])
     };//end if(!xhr.responseText)
    };//end if(xhr.status!=200)
   };//end if(!xhr.status)
  };//end if(!xhr)
 };//end doXHRs()
 function nextXHR(pms)
 {if(pms.releaseURLs[pms.i])
  {GM_log('update check #'+(pms.i+1)+' - checking '+
    pms.releaseURLs[pms.i]);
   GM_xmlhttpRequest
   ({method:            'GET',
     url:               pms.releaseURLs[pms.i],
     headers:
     {'Cache-Control':  'no-cache',
      'Pragma':         'no-cache'
     },
     onerror:           doXHRs,
     onload:            doXHRs
    }
   );
   pms.i++;
  }else
  {GM_log('ran out of places to look for updates');
   if(confirm(SELFU+pms.name+WASUN+UF+CHIVL))
   {UF=askUF(pms,UF);
    GM_setValue(S_UF,UF);
   };
   //reset for next time (if any)
   pms.i=0;
   pms.m=false;
  };
 };

 //subroutines
 function parseParms(metaBlock)
 {var metalines=metaBlock.match(/^\/\/ \@\S+\s+.+$/gm);
  var metaparms=new ParmPack;
  var lineparts,i;
  for(i=0;i<metalines.length;i++)
  {lineparts=metalines[i].match(/^\/\/ \@(\S+)\s+(.+)$/);
   switch(lineparts[1])
   {case 'name':
    case 'shortname':
     metaparms[lineparts[1]]=lineparts[2];
     break;
    case 'released':
     metaparms[lineparts[1]]=new Date(lineparts[2]);
     break;
    case 'frequency':
     if(toMillis(lineparts[2]))
     {metaparms[lineparts[1]]=lineparts[2];
     };
     break;
    case 'releaseURL':
    case 'scriptURL':
     metaparms[lineparts[1]+'s'].push(lineparts[2]);
     break;
   };
  };
  return metaparms;
 };
 function toMillis(lyne)
 {if(!lyne)
  {return null;
  };
  var wurds=lyne.split(/\s+/);
  if(wurds.length!=2)
  {return null;
  };
  switch(wurds[1].toLowerCase())
  {case 'months':
   case 'month':
    wurds[0]*=4.4;//close enough
   case 'weeks':
   case 'week':
    wurds[0]*=7;
   case 'days':
   case 'day':
    wurds[0]*=24;
   case 'hours':
   case 'hour':
    wurds[0]*=60;
   case 'minutes':
   case 'minute':
    return wurds[0]*60*1000;
   default:
    return null;
  };
 };
 function askUF(pms,was)
 {var x=prompt(HWLNG+pms.name+WAITB,was);
  if(x==null)
  {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
    FRMTH);
   return was;
  }else
  {while(!toMillis(x))
   {x=prompt(DIDNT+HWLNG+pms.name+WAITB,was);
    if(x==null)
    {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
      FRMTH);
     return was;
    };
   };
   return x;
  };
 };

 //constructor
 function ParmPack()
 {this.name=null;
  this.shortname=null;
  this.released=null;
  this.frequency=null;
  this.releaseURLs=[];
  this.scriptURLs=[];
  this.i=0;
  this.m=false;
 };
};