import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

// Hex equivalents of the app's oklch design tokens
const C = {
  bg: '#111111',
  card: '#1c1c1c',
  border: '#2e2e2e',
  fg: '#f5f5f5',
  muted: '#666666',
  red: '#e13b1b',       // oklch(0.55 0.21 27)
  redDim: '#1f0d08',
  green: '#1fa35c',     // oklch(0.55 0.17 145)
  greenDim: '#07180e',
}

function edgeSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params
  const { searchParams } = new URL(request.url)

  // Defaults — overridden by Supabase data or URL query params
  let itemName   = searchParams.get('name')    ?? 'Menu Item'
  let chainName  = searchParams.get('chain')   ?? 'Fast Food Chain'
  let usCount    = Number(searchParams.get('us')      ?? 13)
  let ukCount    = Number(searchParams.get('uk')      ?? 10)
  let bannedCount = Number(searchParams.get('flagged') ?? 6)
  let gapScore   = Number(searchParams.get('score')   ?? 8)

  // Live Supabase lookup when a real itemId is provided
  if (itemId !== 'preview') {
    try {
      const sb = edgeSupabase()
      if (sb) {
        const { data } = await sb
          .from('menu_items')
          .select(
            'name, us_ingredient_count, uk_ingredient_count, flagged_count, gap_score, chains!inner(name)'
          )
          .eq('id', itemId)
          .single()

        if (data) {
          const chain = data.chains as unknown as { name: string }
          itemName    = data.name as string
          chainName   = chain.name
          usCount     = (data.us_ingredient_count as number) ?? usCount
          ukCount     = (data.uk_ingredient_count as number) ?? ukCount
          bannedCount = (data.flagged_count as number)       ?? bannedCount
          gapScore    = (data.gap_score as number)           ?? gapScore
        }
      }
    } catch {
      // fall through to defaults
    }
  }

  const gapColor =
    gapScore >= 7 ? C.red : gapScore >= 4 ? '#888888' : C.green

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          backgroundColor: C.bg,
          padding: '52px 64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{ fontSize: '32px', fontWeight: 800, color: C.fg, letterSpacing: '-0.5px' }}
            >
              Menu
            </span>
            <span
              style={{ fontSize: '32px', fontWeight: 800, color: C.red, letterSpacing: '-0.5px' }}
            >
              Truth
            </span>
          </div>

          {/* Label chip */}
          <div
            style={{
              display: 'flex',
              border: `1px solid ${C.border}`,
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              color: C.muted,
              letterSpacing: '0.1em',
            }}
          >
            US VS EU · INGREDIENT REPORT
          </div>
        </div>

        {/* ── Item title ─────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: C.muted, marginBottom: '4px' }}>
            {chainName}
          </span>
          <span
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: C.fg,
              lineHeight: '1.1',
              letterSpacing: '-1px',
            }}
          >
            {itemName}
          </span>
        </div>

        {/* ── US / UK columns ────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            flex: 1,
            marginBottom: '18px',
          }}
        >
          {/* US */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: C.redDim,
              border: `2px solid ${C.red}`,
              borderRadius: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                backgroundColor: C.red,
                borderRadius: '6px',
                padding: '4px 14px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}
              >
                US VERSION
              </span>
            </div>
            <span
              style={{ fontSize: '80px', fontWeight: 900, color: C.red, lineHeight: '1' }}
            >
              {usCount}
            </span>
            <span style={{ fontSize: '17px', color: C.muted, marginTop: '8px' }}>
              ingredients
            </span>
          </div>

          {/* VS divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#333' }}>VS</span>
          </div>

          {/* UK */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: C.greenDim,
              border: `2px solid ${C.green}`,
              borderRadius: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                backgroundColor: C.green,
                borderRadius: '6px',
                padding: '4px 14px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}
              >
                UK VERSION
              </span>
            </div>
            <span
              style={{ fontSize: '80px', fontWeight: 900, color: C.green, lineHeight: '1' }}
            >
              {ukCount}
            </span>
            <span style={{ fontSize: '17px', color: C.muted, marginTop: '8px' }}>
              ingredients
            </span>
          </div>
        </div>

        {/* ── Banned callout ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            backgroundColor: C.redDim,
            border: `2px solid ${C.red}`,
            borderRadius: '12px',
            padding: '18px 28px',
            marginBottom: '24px',
          }}
        >
          {/* "!" icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: C.red,
              borderRadius: '8px',
              width: '42px',
              height: '42px',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#fff', lineHeight: '1' }}>
              !
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '40px', fontWeight: 900, color: C.red }}>
              {bannedCount}
            </span>
            <span style={{ fontSize: '26px', fontWeight: 700, color: C.fg }}>
              banned ingredients in the US version
            </span>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '15px', color: '#3a3a3a' }}>menutruth.com</span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: gapColor,
              borderRadius: '8px',
              padding: '8px 22px',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
              Gap Score: {gapScore}/10
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
