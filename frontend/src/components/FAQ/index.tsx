import React from 'react';
import './faq.css';

const Presentational: React.FunctionComponent = (props) => {
  const { } = props;

  return (
    <div className="main-content">
      <h2>
        How to apply
      </h2>
      <p>
        Department of Computer Science have 9 study halls with
        personal desks which you can apply to for one semester at a time.
        Full time students writing their master's thesis are prioritized.
      </p>
      <p id="remember">
        Remember that you have to apply for a new workplace every semester.
      </p>
      <p>
        To apply for a personal workplace, you will have to follow a few steps. <br />
        <ol>
          <li>
            Make an account and confirm the details collected from Feide.
            Remember to enter your correct master status as we will
            check your status before assigning the workspaces.
          </li>
          <li>
            Accept the terms of use.
          </li>
          <li>
            Make an application.
            If you have room or other preferences, please write those in the application text
          (Note that all rooms in A4 will be treated as one study hall).
          If you are working with a partner, please also write his/her name in the application.
          Both of you have to create an application.
          </li>
          <li>
            Opt in to the waiting list between 15.11.18 at 08:00 and 20.11.18 at 23:59
          </li>
        </ol>
      </p>
      <p>
        As you might know, we do not have enough personal
         workplaces the cover the entire student mass.
        We have come up with a prioritization system to make things fair for everyone.
        We will start assigning seats after the deadline
         and will try our best to assign all seats before 25.11.18
        You will be notified by email if you have been assigned a personal desk.
      </p>
      <p>
        Students that apply before the deadline
         will be prioritized according to the following rules:
        <ol>
          <li>
            Full time students currently working on a master thesis.
          </li>
          <li>
            Currently working on a specialization project
          </li>
          <li>
            Currently not working on a master related project. (4th class)
          </li>
        </ol>
      </p>
      <p>
        The assignment of workplaces follows the following rules.
        First we will pick at random between students that match category 1.
        If seats still are available, then we will pick at random from category 2, then category 3.
        If you already have a have a seat fall 2019, you will not be prioritized for next semester.
        You will receive the same seat unless you write something else in your application.
        <br />
        Seats assigned for spring 2019 will not be available before 01.01.2019!
      </p>
    </div>
  );
};

export default Presentational;
