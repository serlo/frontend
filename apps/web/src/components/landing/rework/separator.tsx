import { cn } from '@/helper/cn'

export function Separator(props: { className?: string }) {
  return (
    <hr
      className={cn(
        props.className,
        'h-8 w-full border-0 bg-[url("/_assets/img/landing/separator.svg")] bg-center bg-no-repeat py-20 outline-none'
      )}
    ></hr>
  )
}
