import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eprgyheskouunjqscric.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcmd5aGVza291dW5qcXNjcmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNTkzNDMsImV4cCI6MjAzMDczNTM0M30.rZeO08UGo4x1vOT2BPx1Trn_VjR--MZtMAtt1NqoPiA'
const supabase = createClient(supabaseUrl, supabaseKey)
