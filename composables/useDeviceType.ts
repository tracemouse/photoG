export const useDeviceType = () => {

    let isMobile = false
    let isDesktop = false
    let isWechat = false

    let UA: string
    if (import.meta.client)
      // 如果是在客户端执行，则通过 navigator 获取 user-agent
      UA = navigator.userAgent
    else
      // 如果是在服务端执行，则通过请求头获取 user-agent
      UA = useRequestHeader('user-agent') as string

    const type = ref<'mobile' | 'desktop'>('desktop')

    // console.log(UA)

    // 通过 UA 来判断设备类型是 pc 还是 mobile
    if (/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)){
      type.value = 'mobile'
      isMobile = true

    }else{
      type.value = 'desktop'
      isDesktop = true
    }

    if(((UA.match(/MicroMessenger/i)) && (UA.match(/MicroMessenger/i)?.toString().toLowerCase() == 'micromessenger'))){
      isWechat = true
    }

    return {
        type: type,
        isMobile: isMobile,
        isDesktop: isDesktop,
        isWechat: isWechat,
        UA: UA
    }
  }