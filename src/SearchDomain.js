import './SearchDomain.css';
import React, { useState } from 'react';
import axios from 'axios';

function SearchDomain() {
  const API_URL = 'https://resolve.unstoppabledomains.com/domains/';
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [stats, setStats] = useState(null);

  function processLookup(e) {
    e.preventDefault();

    let domain = document.getElementById('domain').value;
    if (!domain) return;

    axios.get(API_URL + domain, {
      headers: {
        'Authorization': `bearer ${API_KEY}`
      }
    })
      .then(res => {
        setStats(res.data);
        console.log(res.data);
    })
      .catch(err => {
        setStats();
    });
  }

  return (
    <div className="text-center">
      <div>
        <h1>Search for any Unstoppable Domain</h1>
      </div>
      <form onSubmit={processLookup}>
        <div>
          <input id="domain" type="text" placeholder="Enter a domain name (Ex : anon.crypto)" aria-label="Enter a domain name" aria-describedby="button-addon"autoComplete="off"/>
          <button type="submit">Search</button>
        </div> 
      </form>
      {stats ?
      <div className="domain-card">
        <h2>{stats.meta.domain}</h2>
        <h3>Possessed by {stats.meta.owner}</h3>
        <span>On the {stats.meta.blockchain} blockchain</span>

        {stats.records["whois.for_sale.value"] ?
          <div className="onsale">On Sale</div>
          : <div className="nosale">Not on Sale</div>
        }
        <div>
          <span>Mail: {stats.records["whois.email.value"]}</span>
        </div>
        <div>
          <h3><strong>Here are the differents blockchain addresses in the domain profile</strong></h3>
          <div>
          {stats.records["crypto.ETH.address"] ?
            <span>ETH address : {stats.records["crypto.ETH.address"]}</span>
            :
              <div>
                <b>No ETH address</b>
              </div>
          }
          </div>
          <div>
          {stats.records["crypto.MATIC.version.MATIC.address"] ?
            <span>Matic address : {stats.records["crypto.MATIC.version.MATIC.address"]}</span>
            :
              <div>
                <b>No Matic address</b>
              </div>
          }
          </div>

          <button className="contact">
            <a className="contactlink" href={`mailto:${stats.records['whois.email.value']}`}>
              Email the owner
            </a>
          </button>
        </div>
      </div>
      :
        <div>
          <b>Search a domain</b>
        </div>
      }
    </div>
  );
}

export default SearchDomain;
