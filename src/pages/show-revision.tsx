import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { useInstanceData } from '@/contexts/instance-context'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import {
  AnyEditorPlugin,
  StaticRenderer,
} from '@/serlo-editor/static-renderer/static-renderer'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      loadLoggedInData /* warn: enables preview editor without login */
      entityId={props.id}
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <Content />
          </main>
        </MaxWidthDiv>
      </div>
    </FrontendClientBase>
  )
})

function Content() {
  const { lang } = useInstanceData()
  const routerAsPath = useRouter().asPath

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  editorRenderers.init(
    createRenderers({ instance: lang, isRevisionView: false, routerAsPath })
  )

  return (
    <main id="content">
      <section itemProp="articleBody">
        <div className="serlo-content-with-spacing-fixes">
          <StaticRenderer state={mockState} />
        </div>
      </section>
    </main>
  )
}

const mockState = JSON.parse(
  '{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"856a502f-6ea9-4704-8228-bb6ab971356c"},"multimedia":{"plugin":"image","state":{"src":"","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"6587f1cb-cbab-4ccd-b94e-ae17c9b2e1a1"}},"id":"2f5e40b3-99eb-40e6-ae85-9305cab936a1"},"illustrating":true,"width":50},"id":"97ffb8ab-e9e8-4b60-8aad-1f0982058ead"},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","children":[{"text":"text"}],"level":2},{"type":"h","level":3,"children":[{"text":"h3 "}]},{"type":"p","children":[{"strong":true,"text":"bold "},{"text":"/"},{"strong":true,"text":" "},{"text":"italic ","em":true},{"text":"/ "},{"type":"a","href":"/1555","children":[{"text":"internal link"}]},{"text":" / "},{"type":"a","href":"https://wikipedia.org","children":[{"text":"external link"}]},{"text":" / "},{"text":"blue","color":0,"strong":true},{"text":" / "},{"text":"green","color":1,"strong":true},{"text":" / "},{"text":"orange","color":2,"strong":true},{"color":1,"text":" "},{"text":"/ "},{"type":"math","src":"math\\\\ \\\\sqrt{x}","inline":true,"children":[{"text":""}]},{"text":" / "},{"text":"code","code":true}]}],"id":"27171df9-c8d5-44cb-bb88-9d7a47f700d2"},{"plugin":"text","state":[{"children":[{"children":[{"type":"list-item-child","children":[{"text":"ordered"}]}],"type":"list-item"},{"children":[{"type":"list-item-child","children":[{"text":"list"}]}],"type":"list-item"},{"children":[{"children":[{"text":""}],"type":"list-item-child"}],"type":"list-item"}],"type":"ordered-list"},{"children":[{"text":""}],"type":"p"},{"children":[{"children":[{"type":"list-item-child","children":[{"text":"unodered"}]}],"type":"list-item"},{"children":[{"type":"list-item-child","children":[{"text":"list"}]}],"type":"list-item"}],"type":"unordered-list"}],"id":"9a16ed96-b32b-4b44-8b43-c7f6ea8ab3f1"},{"plugin":"text","state":[{"type":"h","children":[{"text":"image"}],"level":2}],"id":"fc1e95ee-22c8-4a77-925b-b5fe2e4a4559"},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/2734_Aw2Z6Xj7BZ.png","alt":"Some Graph","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":"Caption"}]}],"id":"7c3c1d5b-6bf2-4f31-b71f-e7053cd4112f"}},"id":"f6e40c61-94f7-40c3-9291-e745ee458205"},{"plugin":"text","state":[{"type":"h","children":[{"text":"multimedia explanation"}],"level":2}],"id":"d8cf056e-f689-4521-b584-113d99499bbd"},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"text content"}]}],"id":"7b6d1471-4f08-4f4e-a890-f255388024c5"}],"id":"8189d8c0-8061-4514-b1a4-241043f1bb2c"},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/72a9d890-59f4-11ee-b3d3-91a247dfa66f/286242.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":"Caption"}]}],"id":"c9445e24-368d-47f7-ae1f-bfcd29abc81c"}},"id":"f427671d-bce4-4add-9df1-12d33405b7a0"},"illustrating":true,"width":50},"id":"9def8bfe-9067-4e93-bc1e-59494bc4ca95"},{"plugin":"text","state":[{"type":"h","children":[{"text":"spoiler"}],"level":2}],"id":"8430c0c8-8fc2-41dc-ab52-d0e21f42b8c3"},{"plugin":"spoiler","state":{"title":"title","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"content 1231"}]}],"id":"2866db2d-6210-4579-a6cf-6e01b282bbbf"}],"id":"06c905b1-ce71-4e16-b7f5-9a9c3bd90224"}},"id":"336f717e-0f42-4b2e-8ebf-5e2e7507ea93"},{"plugin":"text","state":[{"type":"h","children":[{"text":"box"}],"level":2}],"id":"7d59264e-b2e5-45a9-92a7-dc0a123949a6"},{"plugin":"box","state":{"type":"theorem","title":{"plugin":"text","state":[{"type":"p","children":[{"text":"title"}]}],"id":"649d16bc-6189-43c1-a7c0-ba2effc6fca7"},"anchorId":"box35654","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"content"}]}],"id":"44cf6a69-d925-420a-8b0e-998b152b7200"}],"id":"d9eb46b5-2d3f-43df-bd8a-a24a43618bff"}},"id":"fc33127e-71dc-4703-b81b-5604dc71ce59"},{"plugin":"box","state":{"type":"approach","title":{"plugin":"text","state":[{"type":"p","children":[{"text":"Title but no content"}]}],"id":"f9e830b1-e32e-4072-bd0a-8cd7cf605f2a"},"anchorId":"box78792","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"8b219220-b7b1-44e3-98a9-f63b68ab77d6"}],"id":"0b903c04-830d-4633-ab90-b87653757ad9"}},"id":"ef7b021e-016c-4461-bb55-9435063da20f"},{"plugin":"box","state":{"type":"blank","title":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"ddc16c72-aed9-4053-97b9-f0ab66556c7f"},"anchorId":"box33885","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Content but no title"}]}],"id":"53a64163-a468-4776-86c8-5c42a68fd087"}],"id":"abf8fac3-c1a4-41a9-af8d-1a5f0ef9b616"}},"id":"bb0e9da2-95d7-4765-bd9e-c4c786dceaef"},{"plugin":"text","state":[{"type":"h","children":[{"text":"table"}],"level":2}],"id":"2e1450e1-a847-4e3c-a0f6-d2934a012132"},{"plugin":"serloTable","state":{"rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"header"}]}],"id":"e53d6258-e259-4e35-a83e-e434eb2c1b6e"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"row"}]}],"id":"7785f88b-5b19-4b17-9c1e-9b9420630071"}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"content"}]}],"id":"c6b1f38f-40b6-4aa2-bb75-571945d6fa25"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"row"}]}],"id":"299df70a-8425-4aab-a4ab-7dd4c3a9d842"}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"content"}]}],"id":"d0f663f8-d104-4477-8da3-29c661d8830e"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"row"}]}],"id":"1e23afcb-2530-40f2-940f-cb0c52623119"}}]}],"tableType":"OnlyColumnHeader"},"id":"a1a92ad1-582f-48bb-b50c-a5be0b6deece"},{"plugin":"text","state":[{"type":"h","children":[{"text":"injection"}],"level":2}],"id":"07bea884-44dc-47cd-be4e-579cf6c3c8f0"},{"plugin":"injection","state":"91324","id":"61bb84ea-0c98-48ce-a6e6-a88effce8914"},{"plugin":"text","state":[{"type":"h","children":[{"text":"equations"}],"level":2}],"id":"442e9f19-6743-47a5-8e13-3b4663636ea0"},{"plugin":"equations","state":{"steps":[{"left":"x","sign":"equals","right":"1","transform":"\\\\cdot5","explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":"why not?"}]}],"id":"3db8191b-9954-4ce2-b1d2-fb2cf2ee83af"}},{"left":"5x","sign":"equals","right":"5","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"593043ff-bc20-40d3-8cab-35704c694474"}}],"firstExplanation":{"plugin":"text","state":[{"type":"p","children":[{"text":"let\'s go"}]}],"id":"bc070871-4e7c-41a9-91d8-8546a4a130a5"},"transformationTarget":"equation"},"id":"76d99935-e1f5-47f9-be5e-6be389f97279"},{"plugin":"text","state":[{"type":"h","children":[{"text":"geogebra"}],"level":2}],"id":"7bfa50c0-4774-459e-a791-3042548c81b2"},{"plugin":"geogebra","state":"nnrmthf4","id":"eb1444f7-7199-47e6-a0a5-d275f48bf984"},{"plugin":"text","state":[{"type":"h","children":[{"text":"highlight (code)"}],"level":2}],"id":"07e0a823-9a58-4e18-b48f-c9ed90332852"},{"plugin":"highlight","state":{"code":"function hi() {\\n  return \\"hello world\\"\\n}","language":"javascript","showLineNumbers":false},"id":"1fe4f994-a2df-46ca-93c2-69f12bbf2932"},{"plugin":"text","state":[{"type":"h","children":[{"text":"video"}],"level":2}],"id":"3cfe307e-5a89-4999-84b0-69ee68a47790"},{"plugin":"video","state":{"src":"https://www.youtube.com/watch?v=QNjD4-NCV-8","alt":""},"id":"f7f13990-5ce0-4b9f-845b-b254d758539a"},{"plugin":"text","state":[{"type":"h","children":[{"text":"anchor"}],"level":2}],"id":"9377a95f-c6fc-4a8c-8f66-6e2407e30ae7"},{"plugin":"anchor","state":"anchor","id":"df377cbb-4b52-4298-a450-c1a0b77eadaa"}],"id":"f77dbfe3-bb7e-455f-ae3e-e575ef16dc2b"},"exercises":[],"exerciseFolder":{"id":"","title":""},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[]},"id":"eb87686d-8b7e-4d0a-b372-d5f828450ded"}'
) as AnyEditorPlugin

// const exMockState = JSON.parse(
//   '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Task of multiple choice exercise"}]}],"id":"55b9de26-2ce8-41cb-9cff-8a5be310cdf6"}],"id":"87ac8fc1-b44a-4ad4-8878-5be578b82c64"},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":false,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Correct Answer"}]}],"id":"dd8ce647-2a95-4d01-9ed0-e3e10090f4b5"},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"This is super helpful feedback"}]}],"id":"43ad8573-35f4-4570-8ed3-ee666c6b91d2"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Wrong Answer"}]}],"id":"37257b8b-53d3-420c-9e37-9f9d1c4d35b1"},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"This is super helpful feedback"}]}],"id":"a6fe1dcb-38fe-410c-8f0b-94c73b5e7fe4"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Wrong Answer without feedback"}]}],"id":"d6546cee-768f-4b5c-b998-8aa5a0c2be5e"},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"fed71e57-92a2-4673-81b6-c55748d6ebac"}}]},"id":"96fc2f78-103d-4045-a7be-71be70d0f2f0"}},"id":"0f9ff81b-d5fe-401b-8866-7d07cacac6c1"}'
// ) as AnyEditorPlugin
