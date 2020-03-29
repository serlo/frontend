import React from 'react'
import styled from 'styled-components'

interface User {
    id: string
    username: string
  }

interface NotificationProp {
    author: User,
    body: string,
    timestamp: string,
    readed: boolean
}

export default function Notifications(entries: NotificationProp[]) {
    return (
        <Wrapper>
            {entries.map((entry, index) => {
                return (
                    <Item readed={entry.readed} className={ ( !entry.readed ? "unreaded" : "") }>
                        <Link
                            href={`https://serlo.org/${entry.author.id}`}>
                                {entry.author.username}
                        </Link>
                        <Body dangerouslySetInnerHTML={{__html: entry.body}}></Body>
                        <TimestampText>
                            {entry.timestamp}
                        </TimestampText>
                    </Item>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 50px 0;
`

const Link = styled.a`
    color: ${props => props.theme.colors.brand};
    text-decoration: none;
    margin-right: 5px;
    &:hover {
        color: ${props => props.theme.colors.lightblue};
    }
`

const TimestampText = styled.span`
    color: ${props => props.theme.colors.gray};
    margin-left: 5px;
`

const Item = styled.div<{ readed: boolean }>`
    margin: 10px 0;
    padding: 24px;
    &:nth-child(even) {
        background: ${props => props.theme.colors.bluewhite};
    }
    &.unreaded {
        font-weight: 600;
        &:before {
            content: "";
            display: inline-block;
            background: ${props => props.theme.colors.brand};
            border-radius: 50%;
            width: 10px;
            height: 10px;
            margin-right: 7px;
        }
    }
    
`

const Body = styled.span`
    a {
        color: ${props => props.theme.colors.brand};
        text-decoration: none;
    }
    a:hover {
        color: ${props => props.theme.colors.lightblue};
    }
`
