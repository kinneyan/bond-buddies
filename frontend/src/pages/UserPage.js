import React from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserPage.css'; 

const UserInfo = () => {
  return (
        <div className="userinfo">
        <div className="content">
            <div className="left-content">
                <h3 id="hello">Hello, User</h3>
                <h2 id="type">Buddy Type</h2>
                <p id="descrip">Buddy description</p>
            </div>
            <div className="right-content">
                <table className="rounded-table">
                    <tbody>
                        <tr>
                            <td className="assessment">Personality Test</td>
                            <td className="result">Data 1</td>
                        </tr>
                        <tr>
                            <td className="assessment">DISC</td>
                            <td className="result">Data 2</td>
                        </tr>
                        <tr>
                            <td className="assessment">Friendship Langauge</td>
                            <td className="result">Data 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

const AsessmentInfo = () => {
    return (
        <div className="asessmentInfo">
            <div className="pt">
                <h5 className="assesstitle">Personality Test - Result</h5>
                <p className="assesstext">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam incidunt pariatur maxime, amet perspiciatis 
                    deserunt soluta officia nobis, vel aut quasi ratione molestiae quam perferendis distinctio expedita omnis voluptatem.</p>
            </div>
            <div className="disc">
                <h5 className="assesstitle">DISC - Result</h5>
                <p className="assesstext">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam incidunt pariatur maxime, amet perspiciatis 
                    deserunt soluta officia nobis, vel aut quasi ratione molestiae quam perferendis distinctio expedita omnis voluptatem.</p>
            </div>
            <div className="fl">
                <h5 className="assesstitle">Friendship Language - Result</h5>
                <p className="assesstext">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam incidunt pariatur maxime, amet perspiciatis 
                    deserunt soluta officia nobis, vel aut quasi ratione molestiae quam perferendis distinctio expedita omnis voluptatem.</p>
            </div>
        </div>
    );
};

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserInfo />
      <AsessmentInfo />
      <Footer />
    </>
  );
};

export default UserPage;
