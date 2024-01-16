import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const AccountMenuSidebar = ({ data }) => {
    const name = useSelector((state) => state.auth.name);
    const emailId = useSelector((state) => state.auth.emailId);
    const selectimage = useSelector((state) => state.auth.selectimage);

    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header">
                <img src={selectimage} />
                <figure>
                    <figcaption>{name}</figcaption>
                    <p>{emailId}</p>
                </figure>
            </div>
            <div className="ps-widget__content">
                <ul>
                    {data.map((link) => (
                        <li
                            key={link.text}
                            className={link.active ? 'active' : ''}>
                            <Link href={link.url}>
                                <a>
                                    <i className={link.icon}></i>
                                    {link.text}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/account/my-account">
                            <a>Logout</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default AccountMenuSidebar;
