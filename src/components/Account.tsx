import { FC, SetStateAction, useEffect, useState } from "react";
import { PublicKey, Connection, clusterApiUrl, AccountInfo } from "@solana/web3.js";
import { exampleAccounts } from '../utils/exampleAccounts';
import styles from '../styles/Account.module.css';
import { deserializeJokeAccount } from "utils/deserializeJokeAccount";



export const Account: FC = props => {
  const [history, setHistory] = useState([""])
  const [query, setQuery] = useState("")
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer>>();

  useEffect(() => {
    fetchAccountInfo();
  }, [query]);


  const changeAccount = (e: any, pk: string) => {
    try {
      e.preventDefault();
      // check if valid pubkey
      const pubkey = new PublicKey(pk);
      setHistory([...history, query]);
    } catch { }
    setQuery(pk)
  }

  const getConnection = () => {
    const url = clusterApiUrl("devnet");
    return new Connection(url, "confirmed");
  }

  const fetchAccountInfo = async () => {
    try {
      const address = new PublicKey(query);
      const accountInfo = await getConnection().getAccountInfo(address);
      if (accountInfo == null) return;
      console.log(accountInfo);

      try {
        accountInfo.data = deserializeJokeAccount(accountInfo.data)
      } catch (err) {
        console.error(err);
      }
      setAccountInfo(accountInfo);
    } catch (err) {
      console.error(err);
    }
  }




  return (
    <div className="container">
      <div className="account-examples">
        <h3>No ideas? Few Examples Of Accounts</h3>
        <ul>
          {Object.values(exampleAccounts).map((item, i) =>
            <li key={i}>{item['desc']}:&nbsp;
              <a className="pk" href="" onClick={event => changeAccount(event, item['pk'])}>
                {item['pk']}
              </a>
            </li>)
          }
        </ul>
      </div>
      <div className="searchbar-container">
        <input className="searchbar" placeholder="Search for accounts, programs, tokens"
          onChange={event => changeAccount(event, event.target.value)} value={query} />
      </div>
      <div className="account-container">

        <div className="account-meta">
          <h3>Account Metadata</h3>
          {/* <hr></hr> */}
          <table className="card account-meta-fields">
            <tr>
              <td>lamports</td>
              <td>{accountInfo?.lamports}</td>
            </tr>
            <tr>
              <td>rentEpoch</td>
              <td>{accountInfo?.rentEpoch}</td>
            </tr>
            <tr>
              <td>ownerProgram</td>
              <td><a href="" className="pk" onClick={event => changeAccount(event, accountInfo!.owner.toString())}>
                {accountInfo?.owner.toString()}
              </a></td>
            </tr>
            <tr>
              <td>executable</td>
              <td>{accountInfo?.executable.toString()}</td>
            </tr>
          </table>
        </div>

        <div className="account-data">
          <h3>Account Data</h3>
          {/* <hr></hr> */}
          <pre className="codeblock">
            {JSON.stringify(accountInfo?.data, null, 2)}
          </pre>
        </div>
      </div>
      {/* <hr></hr> */}
      <div className="history">
        👈 Back to Previous Account:&nbsp;
        <a className="pk" href="" onClick={event => changeAccount(event, history.slice(-1))}>
          {history.slice(-1)}
        </a>
      </div>
    </div>
  );
};

