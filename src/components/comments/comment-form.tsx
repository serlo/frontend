import { faReply, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gql } from 'graphql-request'
import { lighten } from 'polished'
import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled, { css } from 'styled-components'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { makeGreenButton, inputFontReset, makeMargin } from '@/helper/css'

export interface SendProps {
  entity_id: string
  parentId: string
  user_id: string
  user_name: string
  body?: string
}

interface CommentFormProps {
  parentId: number
  onSendComment?: (props: SendProps) => void
  placeholder: string
  reply?: boolean
}

export function CommentForm({
  placeholder,
  // parentId,
  // onSendComment,
  reply,
}: CommentFormProps) {
  const [commentValue, setCommentValue] = React.useState('')
  const { strings } = useInstanceData()
  const auth = useAuth()
  const request = createAuthAwareGraphqlFetch(auth)

  //TODO: Finish once legacy endpoint is done so we can test
  async function onSendComment() {
    if (auth.current === null) return
    const input = {
      query: gql`
        mutation createThread(
          $title: String!
          $content: String!
          $objectId: Int!
        ) {
          createThread(title: $title, content: $content, objectId: $objectId) {
            __typename
          }
        }
      `,
      variables: {
        title: '',
        content: commentValue,
        objectId: parent_id,
      },
    }
    const thread = await request(JSON.stringify(input))
    console.log(thread)
  }

  return (
    <StyledBox>
      <StyledTextarea
        value={commentValue}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setCommentValue(event.target.value)
        }}
        placeholder={placeholder}
        reply={reply}
      />
      <SendButton
        title={strings.comments.submit}
        reply={reply}
        // onClick={
        //   onSendComment
        //     ? () =>
        //         onSendComment({
        //           entity_id: entity.id,
        //           parentId: parentId,
        //           user_id: user.id,
        //           user_name: user.username,
        //           body: this.state.newCommentValue,
        //         })
        //     : () => {}
        // }
      >
        <FontAwesomeIcon icon={reply ? faReply : faArrowRight} />
      </SendButton>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  ${makeMargin}
  margin-top: 18px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;

  background-color: ${(props) => lighten(0.45, props.theme.colors.brandGreen)};
  border-radius: 1.8rem;

  &:focus-within {
    min-height: 3rem;
    background-color: ${(props) =>
      lighten(0.35, props.theme.colors.brandGreen)};
  }
`

const StyledTextarea = styled(TextareaAutosize)<{ reply?: boolean }>`
  ${inputFontReset}
  display: block;
  width: 100%;
  font-size: 1.125rem;
  color: #000;
  border: none;
  background: transparent;
  padding: ${(props) =>
    props.reply ? '.5rem 3.5rem .5rem 1rem' : '1.25rem 3.5rem 1.25rem 1rem'};
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  resize: none;
  min-height: 1rem;

  ::placeholder {
    color: ${(props) => props.theme.colors.brandGreen};
  }

  transition: all 0.2s ease-in;
`

const SendButton = styled.button<{ reply?: boolean }>`
  width: 45px;
  height: 45px;
  ${makeGreenButton}
  font-size: 1.55rem;
  padding-left: 7px;

  margin: 0 7px 8px 0;

  > svg {
    vertical-align: ${(props) => (props.reply ? '-2px' : '-4px')};
    padding-left: ${(props) => (props.reply ? '0' : '2px')};
  }

  ${(props) =>
    props.reply &&
    css`
      font-size: 1rem;
      width: 30px;
      height: 30px;
      bottom: 9px;
    `}
`
