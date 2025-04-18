// src/supabase.js
import { createClient } from '@supabase/supabase-js'
// import process from 'process'

const supabaseUrl = 'https://aimqenhxueadamzvvusm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbXFlbmh4dWVhZGFtenZ2dXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4OTk3MTcsImV4cCI6MjA1NjQ3NTcxN30.bIfnEwrG-s0nqVRwmHELGcbxEBL6VMCaVDijOUiDbhU'
export const supabase = createClient(supabaseUrl, supabaseKey)
