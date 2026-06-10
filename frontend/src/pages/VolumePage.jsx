import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

const fadeSlideIn = {
  animation: 'fadeSlideIn 0.3s ease forwards',
}

const tree = {
  id: 'root', title: 'NCC Volume One', subtitle: 'Class 2 to Class 9', color: '#6366F1',
  children: [
    { id: 'A', title: 'Section A', subtitle: 'Governing requirements', color: '#6366F1', children: [
      { id: 'A1', title: 'Part A1', subtitle: 'Interpreting the NCC', color: '#6366F1', children: [
        { id: 'A1-O', title: 'A1O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A1-P', title: 'A1P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A1-D', title: 'A1D1', subtitle: 'DTS solution', color: '#6366F1' },
      ]},
      { id: 'A2', title: 'Part A2', subtitle: 'Compliance with the NCC', color: '#6366F1', children: [
        { id: 'A2-O', title: 'A2O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A2-P', title: 'A2P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A2-D', title: 'A2D1', subtitle: 'DTS solution', color: '#6366F1' },
        { id: 'A2-G4', title: 'A2G4', subtitle: 'Combination of solutions', color: '#6366F1' },
      ]},
      { id: 'A6', title: 'Part A6', subtitle: 'Building classification', color: '#6366F1', bss: true, children: [
        { id: 'A6-O', title: 'A6O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A6-F', title: 'A6F1', subtitle: 'Functional statement', color: '#6366F1' },
        { id: 'A6-P', title: 'A6P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A6-D', title: 'A6D1', subtitle: 'DTS → Classes 1-10', color: '#6366F1' },
      ]},
    ]},
    { id: 'B', title: 'Section B', subtitle: 'Structure', color: '#888780', children: [
      { id: 'B1', title: 'Part B1', subtitle: 'Structural provisions', color: '#888780', children: [
        { id: 'B1-O', title: 'B1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'B1-P', title: 'B1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'B1-D', title: 'B1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'C', title: 'Section C', subtitle: 'Fire resistance', color: '#E24B4A', children: [
      { id: 'C1', title: 'Part C1', subtitle: 'Fire resistance', color: '#E24B4A', children: [
        { id: 'C1-O', title: 'C1O1', subtitle: 'Objective', color: '#E24B4A' },
        { id: 'C1-P', title: 'C1P1', subtitle: 'Performance requirement', color: '#E24B4A' },
        { id: 'C1-D', title: 'C1D1', subtitle: 'DTS → FRL ratings', color: '#E24B4A' },
      ]},
      { id: 'C2', title: 'Part C2', subtitle: 'Stability', color: '#E24B4A', children: [
        { id: 'C2-O', title: 'C2O1', subtitle: 'Objective', color: '#E24B4A' },
        { id: 'C2-P', title: 'C2P1', subtitle: 'Performance requirement', color: '#E24B4A' },
        { id: 'C2-D', title: 'C2D1', subtitle: 'DTS solution', color: '#E24B4A' },
      ]},
    ]},
    { id: 'D', title: 'Section D', subtitle: 'Access and egress', color: '#378ADD', children: [
      { id: 'D1', title: 'Part D1', subtitle: 'Access and egress', color: '#378ADD', children: [
        { id: 'D1-O', title: 'D1O1', subtitle: 'Objective', color: '#378ADD' },
        { id: 'D1-P', title: 'D1P1', subtitle: 'Performance requirement', color: '#378ADD' },
        { id: 'D1-D', title: 'D1D1', subtitle: 'DTS solution', color: '#378ADD' },
      ]},
      { id: 'D4', title: 'Part D4', subtitle: 'Disability access', color: '#378ADD', bss: true, children: [
        { id: 'D4-O', title: 'D4O1', subtitle: 'Objective', color: '#378ADD' },
        { id: 'D4-P', title: 'D4P1', subtitle: 'Performance requirement', color: '#378ADD' },
        { id: 'D4-D', title: 'D4D1', subtitle: 'DTS → AS 1428.1', color: '#378ADD', standard: 'AS 1428.1', children: [
          { id: 'D4-AS', title: 'AS 1428.1', subtitle: 'Design for access and mobility', color: '#06b6d4', desc: 'Sets minimum requirements for accessible building design — door widths (min 850mm clear), corridor widths, ramp gradients (1:14 max), and accessible path of travel from street to building entry.' },
        ]},
      ]},
    ]},
    { id: 'E', title: 'Section E', subtitle: 'Services', color: '#888780', children: [
      { id: 'E1', title: 'Part E1', subtitle: 'Fire fighting', color: '#888780', children: [
        { id: 'E1-O', title: 'E1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'E1-P', title: 'E1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'E1-D', title: 'E1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
      { id: 'E2', title: 'Part E2', subtitle: 'Smoke hazard', color: '#888780', children: [
        { id: 'E2-O', title: 'E2O1', subtitle: 'Objective', color: '#888780' },
        { id: 'E2-P', title: 'E2P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'E2-D', title: 'E2D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'F', title: 'Section F', subtitle: 'Health and amenity', color: '#1D9E75', children: [
      { id: 'F1', title: 'Part F1', subtitle: 'Surface water', color: '#1D9E75', children: [
        { id: 'F1-O', title: 'F1O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F1-P', title: 'F1P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F1-D', title: 'F1D1', subtitle: 'DTS → AS 4654.2', color: '#1D9E75', standard: 'AS 4654.2', children: [
          { id: 'F1-AS', title: 'AS 4654.2', subtitle: 'Waterproofing — external above-ground', color: '#06b6d4', desc: 'Covers waterproofing membranes for external above-ground surfaces such as balconies and podiums. Membrane must extend minimum 100mm up vertical faces. All penetrations must be fully detailed.' },
        ]},
      ]},
      { id: 'F2', title: 'Part F2', subtitle: 'Wet areas', color: '#1D9E75', bss: true, children: [
        { id: 'F2-O', title: 'F2O1', subtitle: 'Objective', color: '#1D9E75', desc: 'Minimise risk of water from wet areas causing damage or unhealthy conditions.' },
        { id: 'F2-F', title: 'F2F1, F2F2', subtitle: 'Functional statements', color: '#1D9E75', desc: 'Building must protect against water damage and overflow from bathrooms and laundries.' },
        { id: 'F2-P', title: 'F2P1, F2P2', subtitle: 'Performance requirements', color: '#1D9E75', desc: 'Overflow from bathrooms must be prevented from reaching other units or public spaces.' },
        { id: 'F2-D', title: 'F2D1 → F2D2', subtitle: 'DTS → AS 3740', color: '#1D9E75', standard: 'AS 3740, AS 2588', desc: 'Building elements in wet areas must be waterproof per Specification 26 and comply with AS 3740.', children: [
          { id: 'F2-AS1', title: 'AS 3740', subtitle: 'Waterproofing of domestic wet areas', color: '#06b6d4', desc: 'Zone 1: shower recess floor and walls to 1800mm. Zone 2: bathroom floor with 150mm upstand at walls. Products must be compatible with substrate and applied by a licensed waterproofer.' },
          { id: 'F2-AS2', title: 'AS 2588', subtitle: 'Gypsum plasterboard', color: '#06b6d4', desc: 'Moisture-resistant (MR) plasterboard required in wet areas. Fire-rated board required on FRL walls. Standard board for dry areas only.' },
        ]},
      ]},
      { id: 'F3', title: 'Part F3', subtitle: 'Roof and wall cladding', color: '#1D9E75', bss: true, children: [
        { id: 'F3-O', title: 'F3O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F3-P', title: 'F3P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F3-D', title: 'F3D1', subtitle: 'DTS → AS 1288, AS 2047', color: '#1D9E75', standard: 'AS 1288, AS 2047', children: [
          { id: 'F3-AS1', title: 'AS 1288:2021', subtitle: 'Glass in buildings', color: '#06b6d4', desc: 'Safety glass required in shower screens, near doors, and low-level glazing below 300mm from floor. Minimum 6mm toughened safety glass for shower screens. Laminated glass for overhead glazing.' },
          { id: 'F3-AS2', title: 'AS 2047:2014', subtitle: 'Windows and external glazed doors', color: '#06b6d4', desc: 'Windows and external glazed doors must meet structural and weather performance ratings for the wind region. Performance levels N1 to N6. Products must be tested and rated to AS 2047.' },
        ]},
      ]},
      { id: 'F5', title: 'Part F5', subtitle: 'Room heights', color: '#1D9E75', bss: true, children: [
        { id: 'F5-O', title: 'F5O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F5-P', title: 'F5P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F5-D', title: 'F5D2', subtitle: 'DTS → 2.4m minimum', color: '#1D9E75', desc: 'Habitable rooms must have a minimum ceiling height of 2.4m.' },
      ]},
      { id: 'F6', title: 'Part F6', subtitle: 'Light and ventilation', color: '#1D9E75', bss: true, children: [
        { id: 'F6-O', title: 'F6O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F6-P', title: 'F6P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F6-D', title: 'F6D2', subtitle: 'DTS → window area ratios', color: '#1D9E75', desc: 'Natural light: window area at least 10% of floor area. Ventilation: openable area at least 5%.' },
      ]},
    ]},
    { id: 'G', title: 'Section G', subtitle: 'Ancillary provisions', color: '#888780', children: [
      { id: 'G1', title: 'Part G1', subtitle: 'Minor structures', color: '#888780', children: [
        { id: 'G1-O', title: 'G1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'G1-D', title: 'G1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'I', title: 'Section I', subtitle: 'Special use', color: '#888780', children: [
      { id: 'I1', title: 'Part I1', subtitle: 'Class 9b buildings', color: '#888780', children: [
        { id: 'I1-O', title: 'I1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'I1-P', title: 'I1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'I1-D', title: 'I1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'J', title: 'Section J', subtitle: 'Energy efficiency', color: '#BA7517', children: [
      { id: 'J1', title: 'Part J1', subtitle: 'Energy performance', color: '#BA7517', children: [
        { id: 'J1-O', title: 'J1O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J1-P', title: 'J1P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J1-D', title: 'J1D1', subtitle: 'DTS solution', color: '#BA7517' },
      ]},
      { id: 'J4', title: 'Part J4', subtitle: 'Building fabric', color: '#BA7517', bss: true, children: [
        { id: 'J4-O', title: 'J4O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J4-P', title: 'J4P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J4-D', title: 'J4D2', subtitle: 'DTS → AS 4859.1', color: '#BA7517', standard: 'AS 4859.1', desc: 'Minimum R-values for walls, roofs, and floors based on climate zone.', children: [
          { id: 'J4-AS', title: 'AS 4859.1:2018', subtitle: 'Thermal insulation materials', color: '#06b6d4', desc: 'R-value measures resistance to heat flow. Brisbane (Zone 2): R2.5 ceiling, R1.5 wall minimum for Class 1. Higher values required for commercial. Common products: glass wool batts, polyester batts, rigid foam boards.' },
        ]},
      ]},
      { id: 'J5', title: 'Part J5', subtitle: 'Building sealing', color: '#BA7517', bss: true, children: [
        { id: 'J5-O', title: 'J5O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J5-P', title: 'J5P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J5-D', title: 'J5D2', subtitle: 'DTS → sealing specs', color: '#BA7517' },
      ]},
    ]},
  ]
}

const treeV2 = {
  id: 'root2', title: 'NCC Volume Two', subtitle: 'Class 1 and Class 10 buildings', color: '#06b6d4',
  children: [
    { id: 'V2-A', title: 'Section A', subtitle: 'Governing requirements', color: '#6366F1', children: [
      { id: 'V2-A1', title: 'Part A1', subtitle: 'Interpreting the NCC', color: '#6366F1', children: [
        { id: 'V2-A1-O', title: 'A1O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'V2-A1-P', title: 'A1P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'V2-A1-D', title: 'A1D1', subtitle: 'DTS solution', color: '#6366F1' },
      ]},
      { id: 'V2-A2', title: 'Part A2', subtitle: 'Compliance with the NCC', color: '#6366F1', children: [
        { id: 'V2-A2-O', title: 'A2O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'V2-A2-P', title: 'A2P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'V2-A2-D', title: 'A2D1', subtitle: 'DTS solution', color: '#6366F1' },
      ]},
      { id: 'V2-A6', title: 'Part A6', subtitle: 'Building classification', color: '#6366F1', children: [
        { id: 'V2-A6-O', title: 'A6O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'V2-A6-F', title: 'A6F1', subtitle: 'Functional statement', color: '#6366F1' },
        { id: 'V2-A6-P', title: 'A6P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'V2-A6-D', title: 'A6D1', subtitle: 'DTS → Class 1 and 10', color: '#6366F1' },
      ]},
    ]},
    { id: 'V2-H', title: 'Section H', subtitle: 'Class 1 and 10 buildings', color: '#06b6d4', children: [
      { id: 'V2-H1', title: 'Part H1', subtitle: 'Structure', color: '#06b6d4', children: [
        { id: 'V2-H1-O', title: 'H1O1', subtitle: 'Objective', color: '#06b6d4' },
        { id: 'V2-H1-P', title: 'H1P1', subtitle: 'Performance requirement', color: '#06b6d4' },
        { id: 'V2-H1-D', title: 'H1D1', subtitle: 'DTS solution', color: '#06b6d4' },
      ]},
      { id: 'V2-H2', title: 'Part H2', subtitle: 'Damp and weatherproofing', color: '#06b6d4', children: [
        { id: 'V2-H2-O', title: 'H2O1', subtitle: 'Objective', color: '#06b6d4' },
        { id: 'V2-H2-P', title: 'H2P1', subtitle: 'Performance requirement', color: '#06b6d4' },
        { id: 'V2-H2-D', title: 'H2D1', subtitle: 'DTS → AS 4654.2', color: '#06b6d4', standard: 'AS 4654.2', children: [
          { id: 'V2-H2-AS', title: 'AS 4654.2', subtitle: 'External waterproofing membranes', color: '#1D9E75', desc: 'Waterproofing membranes for external above-ground surfaces — balconies, podiums. Membrane must extend minimum 100mm up vertical faces.' },
        ]},
      ]},
      { id: 'V2-H3', title: 'Part H3', subtitle: 'Fire safety', color: '#E24B4A', children: [
        { id: 'V2-H3-O', title: 'H3O1', subtitle: 'Objective', color: '#E24B4A' },
        { id: 'V2-H3-P', title: 'H3P1', subtitle: 'Performance requirement', color: '#E24B4A' },
        { id: 'V2-H3-D', title: 'H3D1', subtitle: 'DTS solution', color: '#E24B4A' },
      ]},
      { id: 'V2-H4', title: 'Part H4', subtitle: 'Health and amenity', color: '#1D9E75', children: [
        { id: 'V2-H4-O', title: 'H4O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'V2-H4-P', title: 'H4P1', subtitle: 'Performance requirement', color: '#1D9E75', desc: 'Wet areas must be waterproofed to prevent water damage and health risks.' },
        { id: 'V2-H4-D2', title: 'H4D2', subtitle: 'DTS → wet area locations', color: '#1D9E75', desc: 'Specifies where waterproofing is required — shower recess, bathroom floor, laundry.' },
        { id: 'V2-H4-D3', title: 'H4D3', subtitle: 'DTS → AS 3740', color: '#1D9E75', standard: 'AS 3740, AS 2588', desc: 'Specifies materials and installation method for waterproofing. References AS 3740.', children: [
          { id: 'V2-H4-AS1', title: 'AS 3740', subtitle: 'Waterproofing of wet areas', color: '#1D9E75', desc: 'Zone 1: shower walls to 1800mm. Zone 2: bathroom floor with 150mm upstand at walls.' },
          { id: 'V2-H4-AS2', title: 'AS 2588', subtitle: 'Gypsum plasterboard', color: '#1D9E75', desc: 'Moisture-resistant plasterboard required in wet areas. Fire-rated board for FRL walls.' },
        ]},
      ]},
      { id: 'V2-H5', title: 'Part H5', subtitle: 'Safe movement and access', color: '#378ADD', children: [
        { id: 'V2-H5-O', title: 'H5O1', subtitle: 'Objective', color: '#378ADD' },
        { id: 'V2-H5-P', title: 'H5P1', subtitle: 'Performance requirement', color: '#378ADD' },
        { id: 'V2-H5-D', title: 'H5D1', subtitle: 'DTS → stairs and balustrades', color: '#378ADD', desc: 'Minimum stair dimensions, balustrade heights (1m for floors over 1m above ground), slip resistance.' },
      ]},
      { id: 'V2-H6', title: 'Part H6', subtitle: 'Energy efficiency', color: '#BA7517', children: [
        { id: 'V2-H6-O', title: 'H6O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'V2-H6-P', title: 'H6P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'V2-H6-D', title: 'H6D1', subtitle: 'DTS → AS 4859.1', color: '#BA7517', standard: 'AS 4859.1', desc: 'Minimum R-values for walls, roofs, and floors. Brisbane (Zone 2): R2.5 ceiling, R1.5 wall.', children: [
          { id: 'V2-H6-AS', title: 'AS 4859.1', subtitle: 'Thermal insulation materials', color: '#BA7517', desc: 'R-value measures resistance to heat flow. Higher R-value = better insulation. Brisbane Zone 2 minimum: R2.5 ceiling, R1.5 wall.' },
        ]},
      ]},
      { id: 'V2-H7', title: 'Part H7', subtitle: 'Ancillary provisions', color: '#888780', children: [
        { id: 'V2-H7-O', title: 'H7O1', subtitle: 'Objective', color: '#888780' },
        { id: 'V2-H7-D', title: 'H7D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
      { id: 'V2-H8', title: 'Part H8', subtitle: 'Livable housing design', color: '#888780', children: [
        { id: 'V2-H8-O', title: 'H8O1', subtitle: 'Objective', color: '#888780' },
        { id: 'V2-H8-P', title: 'H8P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'V2-H8-D', title: 'H8D1', subtitle: 'DTS → livable housing', color: '#888780', desc: 'Accessible entry, step-free shower, wider doorways for livable housing design.' },
      ]},
    ]},
  ]
}

// ─── Search helpers ───────────────────────────────────────────────────────────

/**
 * Walk every node in a tree and collect {node, path} pairs where path is
 * the array of ancestor IDs needed to navigate to that node.
 */
function collectAllNodes(node, ancestorPath = [], results = []) {
  const currentPath = node.id === 'root' || node.id === 'root2' ? [] : [...ancestorPath, node.id]
  results.push({ node, path: currentPath })
  if (node.children) {
    node.children.forEach(child => collectAllNodes(child, currentPath, results))
  }
  return results
}

/**
 * Return true if the query matches any searchable field on the node.
 */
function nodeMatches(node, query) {
  const q = query.toLowerCase().trim()
  if (!q) return false
  const fields = [
    node.title,
    node.subtitle,
    node.standard,
    node.desc,
  ].filter(Boolean).map(f => f.toLowerCase())
  return fields.some(f => f.includes(q))
}

/**
 * Search both trees and return up to 12 results with volume info.
 */
function searchTrees(query) {
  if (!query.trim()) return []
  const v1Nodes = collectAllNodes(tree)
  const v2Nodes = collectAllNodes(treeV2)

  const v1Results = v1Nodes
    .filter(({ node }) => nodeMatches(node, query))
    .map(({ node, path }) => ({ node, path, volume: 1, volumeTree: tree }))

  const v2Results = v2Nodes
    .filter(({ node }) => nodeMatches(node, query))
    .map(({ node, path }) => ({ node, path, volume: 2, volumeTree: treeV2 }))

  return [...v1Results, ...v2Results].slice(0, 12)
}

/**
 * Build a human-readable breadcrumb label array for a path.
 */
function buildBreadcrumbs(path, rootTree) {
  const allNodes = collectAllNodes(rootTree)
  const labels = [rootTree.title]
  path.forEach(id => {
    const found = allNodes.find(n => n.node.id === id)
    if (found) labels.push(found.node.title)
  })
  return labels
}

// ─── Original helpers ─────────────────────────────────────────────────────────

function getNodeAtPath(path, rootTree) {
  return path.reduce((node, id) => node.children?.find(c => c.id === id) || node, rootTree)
}

function getAllNodes(node, depth = 0, result = []) {
  result.push({ ...node, depth })
  if (node.children) node.children.forEach(c => getAllNodes(c, depth + 1, result))
  return result
}

// ─── Components ──────────────────────────────────────────────────────────────

function MiniMap({ path, onNavigate, rootTree }) {
  const pathNodes = [
    { id: rootTree.id, label: rootTree.title, color: rootTree.color },
    ...path.map(id => {
      const found = getAllNodes(rootTree).find(n => n.id === id)
      return { id, label: found?.title || id, color: found?.color || rootTree.color }
    })
  ]

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6">
      <p style={{fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500}}>
        Your path
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {pathNodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1">
            {i > 0 && (
              <span style={{fontSize: '10px', color: '#475569'}}>→</span>
            )}
            <button
              onClick={() => onNavigate(i)}
              className="rounded-lg px-2 py-1 transition-all hover:opacity-80"
              style={{
                backgroundColor: node.color + '22',
                border: `1px solid ${node.color + '66'}`,
              }}
            >
              <p style={{fontSize: '10px', color: node.color, fontWeight: 500, lineHeight: 1.3}}>
                {node.label}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NodeBox({ node, onClick, selected, dimmed }) {
  return (
    <button
      onClick={() => onClick(node)}
      disabled={dimmed || !node.children}
      className="flex flex-col items-center justify-center rounded-xl border-2 px-2 py-2 min-w-0 w-full"
      onMouseEnter={e => { if (!dimmed) e.currentTarget.style.transform = 'scale(1.04)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      style={{
        borderColor: selected ? node.color : dimmed ? '#1e293b' : '#334155',
        backgroundColor: selected ? node.color + '22' : dimmed ? '#0a0f1a' : '#0f172a',
        opacity: dimmed ? 0.25 : 1,
        minHeight: '64px',
        cursor: (dimmed || !node.children) ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        animation: selected ? 'pulse 2s ease-in-out infinite' : undefined,
      }}
    >
      <span className="text-xs font-bold" style={{color: dimmed ? '#334155' : node.color}}>
        {node.title}
      </span>
      <span className="text-center leading-tight mt-0.5" style={{fontSize: '10px', color: dimmed ? '#1e293b' : '#94a3b8'}}>
        {node.subtitle}
      </span>
      {node.standard && !dimmed && (
        <span className="mt-0.5" style={{fontSize: '9px', color: '#06b6d4'}}>{node.standard}</span>
      )}
    </button>
  )
}

// ─── Search UI ────────────────────────────────────────────────────────────────

function SearchBar({ query, setQuery, onNavigateToResult }) {
  const results = query.trim().length >= 2 ? searchTrees(query) : []
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (result) => {
    onNavigateToResult(result)
    setOpen(false)
  }

  const clearSearch = () => {
    setQuery('')
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      {/* Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '10px',
        padding: '8px 12px',
        transition: 'border-color 0.2s',
      }}
        onFocus={() => results.length > 0 && setOpen(true)}
      >
        <Search size={14} color="#475569" style={{ flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(e.target.value.trim().length >= 2) }}
          placeholder="Search by keyword, AS number or section…"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e2e8f0',
            fontSize: '13px',
          }}
        />
        {query && (
          <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <X size={13} color="#475569" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '12px',
          zIndex: 50,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          animation: 'fadeSlideIn 0.2s ease forwards',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#475569', fontSize: '12px' }}>
              No results for "{query}"
            </div>
          ) : (
            <>
              <div style={{ padding: '8px 12px 4px', borderBottom: '1px solid #1e293b' }}>
                <span style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
              </div>
              {results.map((result, i) => {
                const breadcrumbs = buildBreadcrumbs(result.path, result.volumeTree)
                const volColor = result.volume === 1 ? '#6366F1' : '#06b6d4'
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(result)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      borderBottom: i < results.length - 1 ? '1px solid #1e293b' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    {/* Node title + subtitle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: result.node.color || '#e2e8f0',
                      }}>
                        {result.node.title}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>
                        {result.node.subtitle}
                      </span>
                    </div>
                    {/* Breadcrumb path */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3px' }}>
                      {breadcrumbs.map((crumb, ci) => (
                        <span key={ci} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          {ci > 0 && <span style={{ fontSize: '9px', color: '#334155' }}>→</span>}
                          <span style={{
                            fontSize: '9px',
                            color: ci === 0 ? volColor : '#475569',
                            fontWeight: ci === 0 ? 600 : 400,
                          }}>
                            {crumb}
                          </span>
                        </span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VolumePage() {
  const [path, setPath] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [activeVolume, setActiveVolume] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const handleVolumeChange = (vol) => {
    setActiveVolume(vol)
    setPath([])
  }

  const currentTree = activeVolume === 1 ? tree : treeV2

  const displayNode = getNodeAtPath(path, currentTree)
  const displayChildren = displayNode.children || []
  const nextSelectedId = displayChildren.find(c => path.includes(c.id))?.id || null

  const handleClick = (node) => {
    if (!node.children) return
    const idx = path.indexOf(node.id)
    if (idx >= 0) {
      setPath(path.slice(0, idx))
    } else {
      setPath([...path, node.id])
    }
  }

  const goBack = () => setPath(path.slice(0, -1))

  // Called when the user picks a search result
  const handleNavigateToResult = (result) => {
    // Switch volume if needed
    setActiveVolume(result.volume)
    // Set the path — exclude the target node's own id if it has no children
    // (leaf nodes can't be "entered", so navigate to its parent instead)
    const targetPath = result.node.children
      ? result.path
      : result.path.slice(0, -1)
    setPath(targetPath)
  }

  return (
    <>
    <style>{`
      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(-12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0px rgba(99,102,241,0.4); }
        50% { box-shadow: 0 0 0 6px rgba(99,102,241,0.1); }
      }
    `}</style>
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-6">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">NCC 2022</p>
          <h1 className="text-3xl font-bold text-white mb-4">
            {activeVolume === 1 ? 'Volume One' : 'Volume Two'}
          </h1>
          {/* Search bar sits here, right below the heading */}
          <SearchBar query={query} setQuery={setQuery} onNavigateToResult={handleNavigateToResult} />
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleVolumeChange(1)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeVolume === 1 ? '#6366F122' : '#0f172a',
              border: activeVolume === 1 ? '2px solid #6366F1' : '1px solid #334155',
              color: activeVolume === 1 ? '#6366F1' : '#64748b',
            }}
          >
            Volume One
          </button>
          <button
            onClick={() => handleVolumeChange(2)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeVolume === 2 ? '#06b6d422' : '#0f172a',
              border: activeVolume === 2 ? '2px solid #06b6d4' : '1px solid #334155',
              color: activeVolume === 2 ? '#06b6d4' : '#64748b',
            }}
          >
            Volume Two
          </button>
        </div>

        <MiniMap
          path={path}
          onNavigate={(index) => setPath(path.slice(0, index))}
          rootTree={currentTree}
        />

        <div className="flex flex-col items-center">

            {path.length > 0 && (
              <button onClick={goBack} className="self-start flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
                ← Back
              </button>
            )}

            <div
              className="rounded-xl border-2 px-6 py-3 mb-2 text-center"
              style={{borderColor: displayNode.color, backgroundColor: displayNode.color + '22'}}
            >
              <p className="text-sm font-bold" style={{color: displayNode.color}}>{displayNode.title}</p>
              <p className="text-xs text-slate-400">{displayNode.subtitle}</p>
            </div>

            {displayNode.desc && (
              <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-xl p-4 mb-2 text-center">
                <p className="text-xs text-slate-300 leading-relaxed">{displayNode.desc}</p>
                {displayNode.standard && (
                  <p className="text-xs text-accent font-medium mt-2">Standard: {displayNode.standard}</p>
                )}
              </div>
            )}

            {displayChildren.length > 0 && (
              <>
                <div className="w-0.5 h-6 bg-slate-600" />
                <div className="relative w-full">
                  {displayChildren.length > 1 && (
                    <div className="absolute bg-slate-600" style={{
                      top: 0, height: '1px',
                      left: `${100 / (displayChildren.length * 2)}%`,
                      right: `${100 / (displayChildren.length * 2)}%`,
                    }} />
                  )}
                  <div style={fadeSlideIn}>
                  <div className="grid pt-0" style={{
                    gridTemplateColumns: `repeat(${Math.min(displayChildren.length, isMobile ? 2 : 5)}, 1fr)`,
                    gap: '8px',
                  }}>
                    {displayChildren.map(child => {
                      const isSelected = nextSelectedId === child.id
                      const isDimmed = nextSelectedId !== null && nextSelectedId !== child.id
                      return (
                        <div key={child.id} className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-slate-600" />
                          <NodeBox node={child} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                        </div>
                      )
                    })}
                  </div>
                  </div>
                </div>

                {nextSelectedId && (() => {
                  const selectedChild = displayChildren.find(c => c.id === nextSelectedId)
                  const grandchildren = selectedChild?.children || []
                  if (grandchildren.length === 0) return null
                  const nextNextId = grandchildren.find(c => path.includes(c.id))?.id || null
                  return (
                    <>
                      <div className="w-0.5 h-6 bg-slate-600 mt-2" />
                      <div className="relative w-full">
                        <div style={fadeSlideIn}>
                        <div className="grid" style={{
                          gridTemplateColumns: `repeat(${Math.min(grandchildren.length, isMobile ? 2 : 5)}, 1fr)`,
                          gap: '8px',
                        }}>
                          {grandchildren.map(gc => {
                            const isSelected = nextNextId === gc.id
                            const isDimmed = nextNextId !== null && nextNextId !== gc.id
                            return (
                              <div key={gc.id} className="flex flex-col items-center">
                                <div className="w-0.5 h-6 bg-slate-600" />
                                <NodeBox node={gc} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                              </div>
                            )
                          })}
                        </div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </>
            )}
        </div>

      </div>
    </div>
    </>
  )
}
