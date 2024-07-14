
node {
    deleteDir()
    sh 'git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/PipelineFargate'
    def rootDirectory = pwd()
    def jenkinsfile =  load "${rootDirectory}/PipelineFargate/jenkinsfilemaster.groovy"
    jenkinsfile.mainFlow()
} 