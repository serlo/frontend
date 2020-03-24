import React from 'react'
import styled from 'styled-components'

interface HorizonProp {
    imageUrl: string
    title: string
    text: string
    url: string
}

export default function Horizon(entries: HorizonProp[]) {
    return (
        <Wrapper>
            {entries.map((horizonEntry, index) => {
                const key = 'horizon_' + index
                return (
                    <Item href={horizonEntry.url}
                         key={key + '_child' + index}>
                        <Image alt={horizonEntry.title} src={horizonEntry.imageUrl} />
                        <Headline>{horizonEntry.title}</Headline>
                        <Text>{horizonEntry.text}</Text>
                    </Item>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 32px 24px 24px;
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        flex-direction: column;
    }
`

const Item = styled.a`
    color: ${props => props.theme.colors.brand};
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    text-decoration: none;
    max-width: 400px;
    width: 30%;
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        margin-bottom: 30px;
        width: 100%;
    }
`

const Image = styled.img`
    align-self: center;
    margin-bottom: 10px;
    max-width: 400px;
    width: 98%;
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        max-width: 400px;
    }
`

const Headline = styled.p`
    font-weight: bold;
    font-size: 1.25rem;
    margin: 10px 0 5px;
    padding: 0 5px;
`

const Text = styled.p`
    margin: 0;
    padding: 0 5px;
`
