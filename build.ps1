<#
.SYNOPSIS
    Standalone Static Site Generator (SSG) Engine for Raj Kishor Mahapatra's Portal.
    Requires ZERO external dependencies (no Node.js or Python required).
.DESCRIPTION
    Compiles layout templates (src/layouts/base.html) and reusable components
    (src/components/header.html, src/components/footer.html) with page content
    (src/pages/*.html) to produce production-grade static HTML files with complete SEO,
    Generative Engine Optimization (GEO), and Schema.org Knowledge Graph integration.
#>

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  RAJ KISHOR MAHAPATRA - SSG BUILDER (POWERSHELL)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$srcDir = Join-Path $ScriptDir "src"
$distDir = Join-Path $ScriptDir "dist"
$distPagesDir = Join-Path $distDir "pages"
$rootPagesDir = Join-Path $ScriptDir "pages"

# Create output directories
if (-not (Test-Path $distDir)) { New-Item -Path $distDir -ItemType Directory -Force | Out-Null }
if (-not (Test-Path $distPagesDir)) { New-Item -Path $distPagesDir -ItemType Directory -Force | Out-Null }
if (-not (Test-Path $rootPagesDir)) { New-Item -Path $rootPagesDir -ItemType Directory -Force | Out-Null }

# Load templates
$baseLayout = Get-Content -Path (Join-Path $srcDir "layouts\base.html") -Raw -Encoding UTF8
$headerComp = Get-Content -Path (Join-Path $srcDir "components\header.html") -Raw -Encoding UTF8
$footerComp = Get-Content -Path (Join-Path $srcDir "components\footer.html") -Raw -Encoding UTF8

$PageConfig = @{
    'index.html' = @{
        Title = 'Official Website of Raj Kishor Mahapatra | Author & Developer'
        Description = 'Official Website of Raj Kishor Mahapatra - independent professional, author, and developer based out of Chikiti, Ganjam (Odisha, India). Published author of over 54+ works across 13 specialized domains.'
        Canonical = 'https://itsrkmahapatra.qzz.io/'
        Root = './'
        Active = 'home'
        OgType = 'website'
        ExtraScripts = ''
        SchemaJson = @'
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://itsrkmahapatra.qzz.io/#website",
          "url": "https://itsrkmahapatra.qzz.io/",
          "name": "Raj Kishor Mahapatra | Author & Developer",
          "description": "Official Website of Raj Kishor Mahapatra. Author of 54+ works spanning 13 specialized domains and developer of privacy-first client-side utilities.",
          "inLanguage": "en-US",
          "publisher": { "@id": "https://itsrkmahapatra.qzz.io/#person" }
        },
        {
          "@type": "Person",
          "@id": "https://itsrkmahapatra.qzz.io/#person",
          "name": "Raj Kishor Mahapatra",
          "alternateName": ["RK Mahapatra", "Raj Mahapatra", "itsrkmahapatra", "@itsrkmahapatra"],
          "identifier": "itsrkmahapatra",
          "url": "https://itsrkmahapatra.qzz.io/",
          "image": {
            "@type": "ImageObject",
            "url": "https://itsrkmahapatra.qzz.io/images/my-image.jpg"
          },
          "sameAs": [
            "https://github.com/itsrkmahapatra",
            "https://linkedin.com/in/itsrkmahapatra",
            "https://www.amazon.in/stores/author/B0FMT3CP9Y"
          ],
          "jobTitle": "Author & Developer",
          "description": "Distinguished author of 54+ technical handbooks across 13 specialized domains (@itsrkmahapatra), with multi-disciplinary experience spanning software development, creative writing, sales leadership, and financial advisory services.",
          "knowsAbout": ["Generative AI & Autonomous Agents", "Prompt Engineering", "Zero Trust Cybersecurity", "WebCrypto Primitives", "Odisha Heritage & Temple Architecture", "Enterprise Cloud Automation", "Technical Writing"],
          "homeLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chikiti Gada",
              "addressRegion": "Ganjam, Odisha",
              "postalCode": "761010",
              "addressCountry": "IN"
            }
          }
        }
      ]
    }
'@
    }
    'about.html' = @{
        Title = 'Executive Profile & Strategic Journey | Raj Kishor Mahapatra'
        Description = 'Official Profile of Raj Kishor Mahapatra (@itsrkmahapatra) - independent professional, author, and developer based out of Chikiti, Ganjam (Odisha, India). Published author of 54+ works.'
        Canonical = 'https://itsrkmahapatra.qzz.io/pages/about.html'
        Root = '../'
        Active = 'about'
        OgType = 'profile'
        ExtraScripts = ''
        SchemaJson = @'
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://itsrkmahapatra.qzz.io/pages/about.html#profile",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://itsrkmahapatra.qzz.io/#person",
        "name": "Raj Kishor Mahapatra",
        "alternateName": ["RK Mahapatra", "Raj Mahapatra", "itsrkmahapatra", "@itsrkmahapatra"],
        "identifier": "itsrkmahapatra",
        "jobTitle": "Author & Developer",
        "url": "https://itsrkmahapatra.qzz.io/",
        "image": "https://itsrkmahapatra.qzz.io/images/my-image.jpg",
        "description": "Independent professional, author, and developer based out of Chikiti, Ganjam (Odisha, India) known across social platforms as @itsrkmahapatra. Published author of over 54+ technical handbooks across 13 domains.",
        "knowsAbout": ["Generative AI", "Zero Trust Cybersecurity", "Prompt Engineering", "Odisha Heritage & Architecture", "Enterprise Cloud Automation"],
        "sameAs": [
          "https://github.com/itsrkmahapatra",
          "https://linkedin.com/in/itsrkmahapatra",
          "https://www.amazon.in/stores/author/B0FMT3CP9Y"
        ],
        "homeLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chikiti Gada",
            "addressRegion": "Ganjam, Odisha",
            "postalCode": "761010",
            "addressCountry": "IN"
          }
        }
      }
    }
'@
    }
    'books.html' = @{
        Title = 'Books Catalog | Raj Kishor Mahapatra'
        Description = 'Explore over 54+ published books across 13 specialized domains - from AI and cybersecurity frameworks to public health references and cultural literature.'
        Canonical = 'https://itsrkmahapatra.qzz.io/pages/books.html'
        Root = '../'
        Active = 'books'
        OgType = 'website'
        ExtraScripts = '<script src="{{ ROOT }}js/books.js" defer></script>'
        SchemaJson = @'
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://itsrkmahapatra.qzz.io/pages/books.html#webpage",
      "name": "Books Catalog of Raj Kishor Mahapatra",
      "description": "A comprehensive collection of 54+ published works across 13 specialized domains including Generative AI, Prompt Engineering, Cybersecurity, and Odisha Cultural Heritage.",
      "url": "https://itsrkmahapatra.qzz.io/pages/books.html",
      "publisher": {
        "@type": "Person",
        "name": "Raj Kishor Mahapatra",
        "@id": "https://itsrkmahapatra.qzz.io/#person"
      }
    }
'@
    }
    'certifications.html' = @{
        Title = 'Credentials & Certifications | Raj Kishor Mahapatra'
        Description = 'Verified mastery across cybersecurity architectures, defensive penetration testing, and large language model engineering.'
        Canonical = 'https://itsrkmahapatra.qzz.io/pages/certifications.html'
        Root = '../'
        Active = 'certifications'
        OgType = 'website'
        ExtraScripts = '<script src="{{ ROOT }}js/cert-lightbox.js" defer></script>'
        SchemaJson = @'
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://itsrkmahapatra.qzz.io/pages/certifications.html#webpage",
      "name": "Verified Credentials & Certifications of Raj Kishor Mahapatra",
      "description": "Verified mastery and certifications of Raj Kishor Mahapatra across defensive penetration testing, Google Cybersecurity, and Large Language Model Engineering.",
      "url": "https://itsrkmahapatra.qzz.io/pages/certifications.html",
      "publisher": {
        "@type": "Person",
        "name": "Raj Kishor Mahapatra",
        "@id": "https://itsrkmahapatra.qzz.io/#person"
      }
    }
'@
    }
    'projects.html' = @{
        Title = 'Open Source Projects | Raj Kishor Mahapatra'
        Description = 'Explore high-performance, privacy-first open-source projects, WebAssembly tools like Docuvate, InkScribe, and autonomous multi-agent AI architectures.'
        Canonical = 'https://itsrkmahapatra.qzz.io/pages/projects.html'
        Root = '../'
        Active = 'projects'
        OgType = 'website'
        ExtraScripts = ''
        SchemaJson = @'
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://itsrkmahapatra.qzz.io/pages/projects.html#webpage",
      "name": "Open Source Projects of Raj Kishor Mahapatra",
      "description": "High-performance, privacy-first web utilities, WebAssembly tools like Docuvate, and experimental multi-agent AI architectures developed by Raj Kishor Mahapatra.",
      "url": "https://itsrkmahapatra.qzz.io/pages/projects.html",
      "publisher": {
        "@type": "Person",
        "name": "Raj Kishor Mahapatra",
        "@id": "https://itsrkmahapatra.qzz.io/#person"
      }
    }
'@
    }
}

$pages = Get-ChildItem -Path (Join-Path $srcDir "pages") -Filter "*.html"

foreach ($page in $pages) {
    Write-Host "--> Compiling page: $($page.Name)..." -ForegroundColor Yellow
    $rawContent = Get-Content -Path $page.FullName -Raw -Encoding UTF8

    # Strip any residual META comment blocks if present
    $bodyContent = $rawContent -replace '(?s)<!--\s*META\s*.*?\s*-->\s*', ''

    # Lookup metadata configuration
    $cfg = $PageConfig[$page.Name]
    if ($cfg) {
        $title = $cfg.Title
        $description = $cfg.Description
        $canonical = $cfg.Canonical
        $root = $cfg.Root
        $active = $cfg.Active
        $ogType = if ($cfg.OgType) { $cfg.OgType } else { 'website' }
        $extraScripts = $cfg.ExtraScripts
        $schemaJson = if ($cfg.SchemaJson) { $cfg.SchemaJson } else { '{}' }
    } else {
        $title = "Raj Kishor Mahapatra"
        $description = ""
        $canonical = ""
        $root = "../"
        $active = ""
        $ogType = "website"
        $extraScripts = ""
        $schemaJson = "{}"
    }

    # Prepare header with active link highlights
    $actHome = if ($active -eq 'home') { 'active' } else { '' }
    $actBooks = if ($active -eq 'books') { 'active' } else { '' }
    $actProjects = if ($active -eq 'projects') { 'active' } else { '' }
    $actCerts = if ($active -eq 'certifications') { 'active' } else { '' }
    $actAbout = if ($active -eq 'about') { 'active' } else { '' }

    $headerHtml = $headerComp -replace '\{\{\s*ROOT\s*\}\}', $root
    $headerHtml = $headerHtml -replace '\{\{\s*ACTIVE_HOME\s*\}\}', $actHome
    $headerHtml = $headerHtml -replace '\{\{\s*ACTIVE_BOOKS\s*\}\}', $actBooks
    $headerHtml = $headerHtml -replace '\{\{\s*ACTIVE_PROJECTS\s*\}\}', $actProjects
    $headerHtml = $headerHtml -replace '\{\{\s*ACTIVE_CERTIFICATIONS\s*\}\}', $actCerts
    $headerHtml = $headerHtml -replace '\{\{\s*ACTIVE_ABOUT\s*\}\}', $actAbout

    # Prepare footer
    $footerHtml = $footerComp

    # Assemble base layout
    $finalHtml = $baseLayout -replace '\{\{\s*TITLE\s*\}\}', $title
    $finalHtml = $finalHtml -replace '\{\{\s*DESCRIPTION\s*\}\}', $description
    $finalHtml = $finalHtml -replace '\{\{\s*CANONICAL_URL\s*\}\}', $canonical
    $finalHtml = $finalHtml -replace '\{\{\s*OG_TYPE\s*\}\}', $ogType
    $finalHtml = $finalHtml -replace '\{\{\s*SCHEMA_JSON\s*\}\}', $schemaJson
    $finalHtml = $finalHtml -replace '\{\{\s*HEADER\s*\}\}', $headerHtml
    $finalHtml = $finalHtml -replace '\{\{\s*FOOTER\s*\}\}', $footerHtml
    $finalHtml = $finalHtml -replace '\{\{\s*CONTENT\s*\}\}', $bodyContent
    $finalHtml = $finalHtml -replace '\{\{\s*EXTRA_SCRIPTS\s*\}\}', $extraScripts
    $finalHtml = $finalHtml -replace '\{\{\s*ROOT\s*\}\}', $root

    # Write destination file
    if ($page.Name -eq "index.html") {
        $destPathDist = Join-Path $distDir "index.html"
        $destPathRoot = Join-Path $ScriptDir "index.html"
    } else {
        $destPathDist = Join-Path $distPagesDir $page.Name
        $destPathRoot = Join-Path $rootPagesDir $page.Name
    }

    [System.IO.File]::WriteAllText($destPathDist, $finalHtml, [System.Text.Encoding]::UTF8)
    [System.IO.File]::WriteAllText($destPathRoot, $finalHtml, [System.Text.Encoding]::UTF8)
}

# Copy static assets to dist/
Write-Host "--> Copying static assets (css, js, images, Cert) to dist/..." -ForegroundColor Yellow
foreach ($folder in @("css", "js", "images", "Cert")) {
    $srcFolder = Join-Path $ScriptDir $folder
    $destFolder = Join-Path $distDir $folder
    if (Test-Path $srcFolder) {
        if (-not (Test-Path $destFolder)) { New-Item -Path $destFolder -ItemType Directory -Force | Out-Null }
        Copy-Item -Path "$srcFolder\*" -Destination $destFolder -Recurse -Force | Out-Null
    }
}
foreach ($file in @("robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt")) {
    $srcFile = Join-Path $ScriptDir $file
    $destFile = Join-Path $distDir $file
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination $destFile -Force | Out-Null
    }
}

Write-Host "==================================================" -ForegroundColor Green
Write-Host "  SSG BUILD COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  Compiled outputs available at: $distDir" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
