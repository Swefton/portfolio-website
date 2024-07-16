import ErrorIcon from './icons/ErrorIcon';
import WarningIcon from './icons/WarningIcon';
import BellIcon from './icons/BellIcon';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import SourceControlIcon from './icons/SourceControlIcon';
import DevpostIcon from './icons/DevpostIcon';

import React from "react";
import LinkPreview from "../components/LinkPreview";

import '../styles/Bottombar.css';

const Bottombar = () => {
  return (
    <footer className='bottomBar'>
      <div className='container'>
        <LinkPreview url="https://github.com/Swefton/portfolio-website">
          <a
            href="https://github.com/Swefton/portfolio-website"
            target="_blank"
            rel="noreferrer noopener"
            className='section'
          >
            <SourceControlIcon className='icon' />
            <p>main</p>
          </a>
          </LinkPreview>
        <div className='section'>
          <ErrorIcon className='icon' />
          <p className='errorText'>0</p>&nbsp;&nbsp;
          <WarningIcon className='icon' />
          <p>0</p>
        </div>
      </div>

      <div className='container'>
        <LinkPreview url="https://devpost.com/Swefton">
          <a href="https://devpost.com/Swefton" target="_blank" rel="noreferrer noopener">
            <div className='section'>
              <DevpostIcon className='icon' />
              <p>Devpost</p>
            </div>
          </a>
        </LinkPreview>
        <LinkPreview url="https://www.linkedin.com">
          <a href="https://www.linkedin.com/in/amrit-srivastava-725890191/" target="_blank" rel="noreferrer noopener">
            <div className='section'>
              <LinkedinIcon className='icon' />
              <p>Linkedin</p>
            </div>
          </a>
        </LinkPreview>
        <LinkPreview url="https://github.com/Swefton">
          <a href="https://github.com/Swefton" target="_blank" rel="noreferrer noopener">
            <div className='section'>
              <GithubIcon className='icon' />
              <p>Github</p>
            </div>
          </a>
        </LinkPreview>

        <div className='section'>
          <BellIcon />
        </div>
      </div>
    </footer>
  );
};

export default Bottombar;
