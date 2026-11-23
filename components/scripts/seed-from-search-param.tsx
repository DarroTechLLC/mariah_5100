import { InlineScript } from '@/components/scripts/inline-script';

export function SeedFromSearchParam({ targetId, param }: { targetId: string; param: string }) {
  const html = `(function(){
  var el = document.getElementById(${JSON.stringify(targetId)});
  if (!el) return;
  var v = new URLSearchParams(location.search).get(${JSON.stringify(param)});
  if (v) el.value = v;
})()`;
  return <InlineScript html={html} />;
}
