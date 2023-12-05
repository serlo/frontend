import type { RecoveryFlow, UpdateRecoveryFlowBody } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { FlowType } from '@/components/auth/flow-type'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function Recovery() {
  const [flow, setFlow] = useState<RecoveryFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    checkInstance({ redirect: true })
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getRecoveryFlow({ id: String(flowId) })
        .then(({ data }) => setFlow(data))
        .catch(handleFlowError(router, FlowType.recovery, setFlow, strings))
      return
    }

    kratos
      .createBrowserRecoveryFlow()
      .then(({ data }) => setFlow(data))
      .catch(handleFlowError(router, FlowType.recovery, setFlow, strings))
  }, [flowId, router, router.isReady, returnTo, flow, strings, checkInstance])

  async function onSubmit(values: UpdateRecoveryFlowBody) {
    return kratos
      .updateRecoveryFlow({
        flow: String(flow?.id),
        updateRecoveryFlowBody: values,
      })
      .then(({ data }) => setFlow(data))
      .catch(handleFlowError(router, FlowType.recovery, setFlow, strings, true))
  }
  if (!flow) return null
  return (
    <div className="mx-auto max-w-[30rem]">
      <PageTitle
        headTitle
        title={`${strings.auth.recoverTitle} 🕊`}
        extraBold
      />
      <p className="serlo-p -mt-4 mb-10 hyphens-manual">
        {replacePlaceholders(strings.auth.recoveryInstructions, {
          break: <br />,
        })}
      </p>
      <Flow onSubmit={onSubmit} flowType={FlowType.recovery} flow={flow} />
    </div>
  )
}
