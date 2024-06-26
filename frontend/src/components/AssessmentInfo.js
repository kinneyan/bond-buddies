import React, { useEffect } from 'react';

const app_name = "bondbuddies.com/"
function buildPath(route)
{
    if(process.env.NODE_ENV === 'production')
        return "https://" + app_name + route;
    else
        return "http://localhost:3001/" + route;
}

function AssessmentInfo()
{
    var perType;
    var perOverview;
    var discType;
    var discOverview;
    var friendType;
    var friendOverview;
const getTestResults = async event =>
{
    try
    {
        const response = await fetch(buildPath("assessments/results"),
        {method: 'GET', headers:{'Content-type': 'application/json', 
        'Authorization': sessionStorage.getItem('bearer')}})
        var res = JSON.parse(await response.text());
        if (res.error === "Could not get assessment results." ||
            res.error === "No assessment results found.")
            console.log(res.error)
        else
        {       if(res.personality)
                {
                   perType = res.personality.type
                    perOverview = res.personality.description.overview 
                }
                if(res.disc)
                {
                  discType = res.disc.type
                    discOverview = res.disc.description.overview  
                }
                if(res.friendship)
                {
                    friendType = res.friendship.type
                    friendOverview = res.friendship.description
                }
                if (perType) document.getElementById("perType").innerHTML = 'Personality Test - ' + perType
                if (discType) document.getElementById("discType").innerHTML = 'DISC - ' + discType
                if (friendType) document.getElementById("friendType").innerHTML = 'Friendship Language - ' + friendType
                if (perOverview) document.getElementById("perOverview").innerHTML = perOverview
                if (discOverview) document.getElementById("discOverview").innerHTML = discOverview
                if (friendOverview) document.getElementById("friendOverview").innerHTML = friendOverview
        }
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }
    }
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  
        getTestResults()
        return () => { ignore = true; }
    },[]);

    return (
        <div className="assessmentInfo">
            <div className="pt">
                <h5 id="perType" className="assesstitle">Personality Test - No data</h5>
                <p id="perOverview" className="assesstext">Please take the Personality Langauge test to see your results</p>
            </div>
            <div className="disc">
                <h5 id="discType" className="assesstitle">DISC - No data</h5>
                <p id="discOverview" className="assesstext">Please take the DISC test to see your results</p>
            </div>
            <div className="fl">
                <h5 id="friendType" className="assesstitle">Friendship Language - No data</h5>
                <p id="friendOverview" className="assesstext">Please take the Friendship Language test to see your results</p>
            </div>
        </div>
    );

}
export default AssessmentInfo;