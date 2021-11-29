import {
  faFile,
  faNewspaper,
  faGraduationCap,
  faCheck,
  faTrash,
  faUser,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import React, {
  createContext,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import DataGrid, { Column, HeaderRendererProps } from 'react-data-grid'

import { CommentForTasks } from '@/components/comments/comment-for-tasks-tmp'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { TimeAgo } from '@/components/time-ago'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { useFocusRef } from '@/helper/use-focus-ref'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase noContainers showNav={false}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Tasks />
    </FrontendClientBase>
  )
}
export default ContentPage

const filterColumnClassName = 'filter-cell'

interface Row {
  id: number
  task: string
  contentType: string
  subject: string
  issueType: string
  assigned: string
  date: string
}

interface Filter extends Omit<Row, 'id' | 'date'> {
  date: number | undefined
}

const filterStyle = 'w-full pt-1 text-sm block mt-1'

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter loses focus
const FilterContext = createContext<Filter | undefined>(undefined)

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.stopPropagation()
  }
}

function selectStopPropagation(event: React.KeyboardEvent<HTMLSelectElement>) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.stopPropagation()
  }
}

const Tasks = () => {
  const [rows] = useState(createRows)
  const [filters, setFilters] = useState<Filter>({
    task: '',
    subject: 'Alle',
    contentType: 'Alle',
    issueType: 'Alle',
    assigned: '',
    date: undefined,
  })
  const [modalData, setModalData] = useState<Row | undefined>(undefined)

  const columns = useMemo((): readonly Column<Row>[] => {
    return [
      {
        key: 'task',
        name: 'Inhalt',
        width: 300,
        headerCellClass: filterColumnClassName,
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
            {() => (
              <div className="flex">
                {/* <input
                  {...rest}
                  className={filterStyle}
                  value={filters.task}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      task: e.target.value,
                    })
                  }
                  onKeyDown={inputStopPropagation}
                />
                {filters.task !== '' &&
                  renderResetButton({ ...filters, task: '' })} */}
              </div>
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'contentType',
        name: 'Inhaltstyp',
        headerCellClass: filterColumnClassName,
        width: 150,
        formatter: ({ row }) => (
          <div>
            <FontAwesomeIcon
              className="text-brand-lighter min-w-[1.2rem]"
              icon={contentIcons[row.contentType as keyof typeof contentIcons]}
            />{' '}
            {row.contentType}{' '}
          </div>
        ),
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLSelectElement> {...p}>
            {({ filters, ...rest }) => (
              <div className="flex">
                <select
                  {...rest}
                  className={filterStyle}
                  value={filters.contentType}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      contentType: e.target.value,
                    })
                  }
                  onKeyDown={selectStopPropagation}
                >
                  <option value="Alle">Alle</option>
                  <option value="Artikel">Artikel</option>
                  <option value="Kurs">Kurs</option>
                  <option value="Aufgabe">Aufgabe</option>
                  <option value="Seite">Seite</option>
                  <option value="Aufgabengruppe">Aufgabengruppe</option>
                </select>
                {filters.contentType !== 'Alle' &&
                  renderResetButton({ ...filters, contentType: 'Alle' })}
              </div>
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'subject',
        name: 'Fach',
        headerCellClass: filterColumnClassName,
        width: 150,
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLSelectElement> {...p}>
            {({ filters, ...rest }) => (
              <div className="flex">
                <select
                  {...rest}
                  className={filterStyle}
                  value={filters.subject}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      subject: e.target.value,
                    })
                  }
                  onKeyDown={selectStopPropagation}
                >
                  <option value="Alle">Alle</option>
                  <option value="Mathe">Mathe</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Chemie">Chemie</option>
                  <option value="Nachhaltigkeit">Nachhaltigkeit</option>
                </select>
                {filters.subject !== 'Alle' &&
                  renderResetButton({ ...filters, subject: 'Alle' })}
              </div>
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'issueType',
        name: 'Typ',
        width: 200,
        headerCellClass: filterColumnClassName,
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLSelectElement> {...p}>
            {({ filters, ...rest }) => (
              <div className="flex">
                <select
                  {...rest}
                  className={filterStyle}
                  value={filters.issueType}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      issueType: e.target.value,
                    })
                  }
                  onKeyDown={selectStopPropagation}
                >
                  <option value="Alle">Alle</option>
                  <option value="Rechtscheibung">Rechtscheibung</option>
                  <option value="Fehlendes Bild">Fehlendes Bild</option>
                  <option value="Quelle">Quelle</option>
                  <option value="Didaktisch">Didaktisch</option>
                </select>

                {filters.issueType !== 'Alle' &&
                  renderResetButton({ ...filters, issueType: 'Alle' })}
              </div>
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'assigned',
        name: 'Zugeordnet',
        headerCellClass: filterColumnClassName,
        width: 100,
        formatter: ({ row }) => (
          <div>
            {row.assigned ? (
              <img
                src={`https://community.serlo.org/avatar/${row.assigned}`}
                className="w-6 h-6 rounded-full mt-[6px]"
                title={row.assigned}
              />
            ) : null}
          </div>
        ),
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
            {({ filters, ...rest }) => (
              <div className="flex">
                <input
                  {...rest}
                  className={filterStyle}
                  value={filters.assigned}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      assigned: e.target.value,
                    })
                  }
                  onKeyDown={inputStopPropagation}
                  list="assignedUsers"
                />
                {filters.assigned !== '' &&
                  renderResetButton({ ...filters, assigned: '' })}
              </div>
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'date',
        name: 'Angelegt vor',
        width: 150,
        // formatter: ({ row }) => <TimeAgo datetime={row.date} dateAsTitle />,
        headerCellClass: filterColumnClassName,
        headerRenderer: (p) => (
          <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
            {() => (
              <div className="flex">
                {/* <input
                  {...rest}
                  type="number"
                  className={filterStyle}
                  value={filters.date}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      date: Number.isFinite(e.target.valueAsNumber)
                        ? e.target.valueAsNumber
                        : undefined,
                    })
                  }
                  onKeyDown={inputStopPropagation}
                />
                {filters.task !== '' &&
                  renderResetButton({ ...filters, date: undefined })} */}
              </div>
            )}
          </FilterRenderer>
        ),
      },
    ]
  }, [])

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      return (
        //(filters.task ? r.task.includes(filters.task) : true) &&
        (filters.subject !== 'Alle' ? r.subject === filters.subject : true) &&
        (filters.contentType !== 'Alle'
          ? r.contentType === filters.contentType
          : true) &&
        (filters.issueType !== 'Alle'
          ? r.issueType === filters.issueType
          : true) &&
        (filters.assigned
          ? r.assigned.toLowerCase().startsWith(filters.assigned.toLowerCase())
          : true)
        //&&
        // (filters.date !== undefined ? r.date >= filters.date : true)
      )
    })
  }, [rows, filters])

  const dataList = useMemo(() => {
    return (
      <FilterContext.Provider value={filters}>
        <DataGrid
          className="rdg-light filterContainer cursor-pointer"
          columns={columns}
          rows={filteredRows}
          headerRowHeight={70}
          onRowClick={(row) => {
            setModalData(row)
          }}
        />
      </FilterContext.Provider>
    )
  }, [filters, columns, filteredRows])

  function clearFilters() {
    setFilters({
      task: '',
      subject: 'Alle',
      contentType: 'Alle',
      issueType: 'Alle',
      assigned: '',
      date: undefined,
    })
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <PageTitle title="Aufgaben" headTitle />
      <div className="wrapper px-side">
        <div className="toolbar text-right">
          <button
            className="serlo-button serlo-make-interactive-light text-sm mb-4"
            type="button"
            onClick={clearFilters}
          >
            Filter zurücksetzen
          </button>
        </div>

        {dataList}

        <datalist id="assignedUsers">
          {demoUsers.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </datalist>
      </div>
      <ModalWithCloseButton
        isOpen={!!modalData}
        onCloseClick={() => {
          setModalData(undefined)
        }}
      >
        {renderModalContent()}
      </ModalWithCloseButton>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            flex-direction: column;
            height: 80vh;
            gap: 10px;
            > .rdg {
              flex: 1;
            }
          }
          .toolbar {
            text-align: end;
          }
        `}
      </style>
      <style jsx global>{`
        .ReactModalPortal .ReactModal__Content {
          @apply w-[700px] max-w-[90vw] max-h-[90vh];
          @apply translate-y-0 top-8 overflow-y-scroll;
          @apply pt-0;
        }
      `}</style>
      <style global jsx>
        {`
          .filterContainer {
            height: 75vh;
            margin-bottom: 10rem;
          }
          .rdg-header-row {
            background-color: rgba(239, 247, 251);
            input,
            select {
              background-color: rgba(186, 220, 238);
              border-radius: 3px;
              padding: 2px;
            }
          }

          .filter-cell {
            box-shadow: none !important;

            line-height: 35px;
            padding: 0;
            > div {
              padding: 0 8px;
              &:first-child {
                border-bottom: 1px solid var(--border-color);
              }
            }
          }
        `}
      </style>
    </main>
  )

  function renderResetButton(filtersObject: SetStateAction<Filter>) {
    return (
      <button
        className="ml-2 mt-[-2px] font-bold h-6 text-brand"
        title="Filter entfernen"
        onClick={() => {
          setFilters(filtersObject)
        }}
      >
        x
      </button>
    )
  }

  function renderModalContent() {
    if (!modalData) return null

    const avatar = modalData.assigned
      ? `https://community.serlo.org/avatar/${modalData.assigned}`
      : undefined
    return (
      <>
        <p className="serlo-p mt-12">
          <b>Kommentar</b>:
          <div className="-mt-6 -ml-4">
            <EntityIdProvider value={1565}>
              <CommentForTasks id={1565} />
            </EntityIdProvider>
          </div>
        </p>

        <p className="serlo-p">
          <b>Zugehöriger Inhalt</b>:<br />
          <a className="serlo-link block pt-1" href={`/${modalData.id}`}>
            <FontAwesomeIcon
              className="text-brand-lighter min-w-[1.2rem]"
              icon={
                contentIcons[modalData.contentType as keyof typeof contentIcons]
              }
            />{' '}
            {modalData.contentType}
            {': '}
            <b>{modalData.task}</b>
          </a>
        </p>

        <p className="serlo-p">
          <b>Typ der Aufgabe</b>: {modalData.issueType}
        </p>

        <p className="serlo-p">
          <b>Angelegt</b>: <TimeAgo datetime={modalData.date} dateAsTitle />
        </p>

        <p className="serlo-p">
          <b>Fach</b>: {modalData.subject}
        </p>

        <p className="serlo-p">
          <b>Nutzer zugeordnet:</b>
          <br />
          {avatar ? (
            <a
              href={`/user/profile/${modalData.assigned}`}
              className="block pt-1"
            >
              <img src={avatar} className="w-7 h-7 rounded-full inline" />{' '}
              <b className="inline-block align-middle">{modalData.assigned}</b>
            </a>
          ) : (
            <a className="mt-2 serlo-button serlo-make-interactive-light">
              <FontAwesomeIcon icon={faUser} /> User zuordnen
            </a>
          )}
        </p>

        <p className="serlo-p">
          <b>Tools</b>:<br />
          <a className="mt-2 serlo-button serlo-make-interactive-green">
            <FontAwesomeIcon icon={faPencilAlt} /> Jetzt bearbeiten
          </a>
          <a className="mt-2 ml-2 serlo-button serlo-make-interactive-light">
            <FontAwesomeIcon icon={faCheck} /> Als erledingt markieren
          </a>{' '}
          <a className="mt-2 ml-2 serlo-button serlo-make-interactive-light">
            <FontAwesomeIcon icon={faTrash} /> Löschen
          </a>
        </p>
      </>
    )
  }
}

function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  children,
}: HeaderRendererProps<R, SR> & {
  children: (args: {
    ref: React.RefObject<T>
    tabIndex: number
    filters: Filter
  }) => React.ReactElement
}) {
  const filters = useContext(FilterContext)!

  const { ref, tabIndex } = useFocusRef<T>(isCellSelected)

  return (
    <>
      <div>{column.name}</div>
      <div>{children({ ref, tabIndex, filters })}</div>
    </>
  )
}

function createRows() {
  const rows: Row[] = []
  const nowDate = new Date()
  for (let i = 1; i < 200; i++) {
    nowDate.setHours(nowDate.getHours() - Math.floor(Math.random() * 3))
    nowDate.setMinutes(Math.floor(Math.random() * 60))

    rows.push({
      id: i,
      task: getTitle(),
      date: nowDate.toString(),
      contentType: ['Artikel', 'Kurs', 'Aufgabe', 'Seite', 'Aufgabengruppe'][
        Math.floor(Math.random() * 4)
      ],
      subject: ['Mathe', 'Biologie', 'Chemie', 'Nachhaltigkeit'][
        Math.floor(Math.random() * 4)
      ],
      issueType: ['Rechtscheibung', 'Fehlendes Bild', 'Quelle', 'Didaktisch'][
        Math.floor(Math.random() * 4)
      ],
      assigned: getUser(),
    })
  }
  return rows
}

function getTitle() {
  return demoTitles[Math.floor(Math.random() * demoTitles.length)]
}

const demoTitles = [
  'Hypergeometrische Verteilung',
  'Teilaufgabe',
  'Ebene von Koordinatenform in Parameterform umwandeln',
  'Lösung',
  'Rechnen mit Uhrzeiten und Kalendertagen',
  'Kombination der Bausteine',
  'Isotope (x)',
  'If-Sätze - If-clause Aufgabe',
  'Operative Fallananalyse',
  'Das Inventar',
  'Einführung in Forensische Informatik und Kommunikation',
]

const contentIcons = {
  Artikel: faNewspaper,
  Kurs: faGraduationCap,
  Aufgabe: faFile,
  Seite: faFile,
  Aufgabengruppe: faFile,
}

const demoUsers = [
  'wolfgang',
  'kathongi',
  'botho',
  'dal',
  'inyono',
  'kulla',
  'bleacher',
  'Hersheysoldier',
  'bchij',
  'Max_',
  'Wo_Fo',
  'Louisa_H',
  'lea_b',
]

function getUser() {
  if (Math.random() > 0.35) {
    return ''
  } else return demoUsers[Math.floor(Math.random() * demoUsers.length)]
}
